using System.ComponentModel.Design;
using Azure.Core;
using backend.Dtos;
using backend.Models;
using FacebookClone.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class UserRepository : IUserRepository
    {
        private UserContext _user;
        private readonly IWebHostEnvironment env;

        public UserRepository(UserContext user, IWebHostEnvironment env)
        {
            _user = user;
            this.env = env;
        }

        /// <summary>
        /// Creaetes a user
        /// </summary>
        /// <param name="user"> gets the user object and saves it to the database</param>
        /// <returns>the user object</returns>
        public User Create(User user)
        {
            _user.Users.Add(user);
            user.Id = _user.SaveChanges();

            return user;
        }

        /// <summary>
        /// Gets a user by email
        /// </summary>
        /// <param name="email"> gets the email of the user and returns the user object</param>
        /// <returns>the user object</returns>
        public async Task<User> GetByEmailAsync(string email)
        {
            return await _user.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        /// <summary>
        /// Gets a user by id
        /// </summary>
        /// <param name="id"> gets the id of the user and returns the user object</param>
        /// <returns>the user object</returns>
        public async Task<User> GetByIdAsync(int id)
        {
            return await _user.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        /// <summary>
        /// Gets all users
        /// </summary>
        /// <returns>a list of all users</returns>

        public async Task<ICollection<UserDto>> GetUsersByNameAsync(string searchString)
        {
            var searchTerms = searchString.Split(' ', StringSplitOptions.RemoveEmptyEntries);

            var users = await _user
                .Users
                .ToListAsync(); // Retrieve all users from the database

            // Perform client-side filtering using LINQ to Objects
            var filteredUsers = users
                .Where(u => searchTerms.All(term =>
                    u.FirstName.Contains(term, StringComparison.OrdinalIgnoreCase) ||
                    u.Surname.Contains(term, StringComparison.OrdinalIgnoreCase)))
                .Select(u =>
                    new UserDto
                    {
                        Id = u.Id,
                        FirstName = u.FirstName,
                        Surname = u.Surname,
                        ProfilePicName = u.ProfilePicName
                    })
                .ToList();

            return filteredUsers;
        }

        /// <summary>
        /// Uploads an image
        /// </summary>
        /// <param name="imageFile"> gets the image file</param>
        /// <param name="id"> gets the id of the user</param>
        /// <param name="path"> gets the path of the image</param>
        /// <returns>the name of the image</returns>

        public string UploadImage(IFormFile imageFile, int id, string path)
        {
            try
            {
                string contentPath = this.env.ContentRootPath;
                contentPath = contentPath + "Uploads\\";
                var _path = Path.Combine(contentPath, path);
                if (!Directory.Exists(_path))
                {
                    Directory.CreateDirectory(_path);
                }

                // Check the allowed extenstions
                var ext = Path.GetExtension(imageFile.FileName);
                var allowedExtensions = new string[] { ".jpg", ".png", ".jpeg" };
                if (!allowedExtensions.Contains(ext))
                {
                    string msg = string.Format(
                        "Only {0} extensions are allowed",
                        string.Join(",", allowedExtensions)
                    );
                    return msg;
                }
                string uniqueString = Guid.NewGuid().ToString();
                // we are trying to create a unique filename here
                var newFileName = uniqueString + ext;
                var fileWithPath = Path.Combine(_path, newFileName);
                var stream = new FileStream(fileWithPath, FileMode.Create);
                imageFile.CopyTo(stream);
                stream.Close();
                return newFileName;
            }
            catch (Exception ex)
            {
                return $"An error has occured {ex}";
            }
        }

        /// <summary>
        /// Removes an image
        /// </summary>
        /// <param name="id"> gets the id of the user</param>
        /// <param name="path"> gets the path of the image</param>
        /// <returns>true if the image was removed, false otherwise</returns>

        public async Task<bool> RemoveImageAsync(int id, string path)
        {
            try
            {
                var wwwPath = this.env.ContentRootPath;
                wwwPath = wwwPath + "Uploads\\";
                string? imageFileName = await _user
                    .Users
                    .Where(u => u.Id == id)
                    .Select(u => u.ProfilePicName)
                    .FirstOrDefaultAsync();

                var _path = Path.Combine(wwwPath, (path), imageFileName);
                if (System.IO.File.Exists(_path))
                {
                    System.IO.File.Delete(_path);
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        /// <summary>
        /// Saves the changes to the database
        /// </summary>
        /// <returns>true if the changes were saved, false otherwise</returns>

        public bool Save()
        {
            var saved = _user.SaveChanges();
            return saved > 0 ? true : false;
        }

        /// <summary>
        /// Updates a user
        /// </summary>
        /// <param name="user"> gets the user object and updates it in the database</param>
        /// <returns>true if the user was updated, false otherwise</returns>
        
        public bool UpdateUser(User user)
        {
            _user.Update(user);
            return Save();
        }
    }
}
