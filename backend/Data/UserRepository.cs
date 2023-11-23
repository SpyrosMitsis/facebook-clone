using Azure.Core;
using backend.Dtos;
using backend.Models;
using FacebookClone.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;

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
        public User Create(User user)
        {
            _user.Users.Add(user);
            user.Id = _user.SaveChanges();

            return user;
        }
        public async Task<ICollection<User>> GetFriendsAsync(int id)
        {
            var user = await _user.Users.Include(u => u.Friends).ThenInclude(f => f.Friend).FirstOrDefaultAsync(u => u.Id == id);  
            if(user != null)
            {
                var friends = user.Friends.Select(f => f.Friend).ToList();
                return friends;
            }
            return null;
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return  await _user.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _user.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public string UploadImage(IFormFile imageFile, int id, string path)
        {

            try
            {
                string contentPath = this.env.ContentRootPath;
                contentPath = contentPath + "Uploads\\";
                // path = "c://projects/productminiapi/uploads" ,not exactly something like that
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
                    string msg = string.Format("Only {0} extensions are allowed", string.Join(",", allowedExtensions));
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
                return "An error has occured";
            }

        
        }

        public async Task<bool> RemoveImageAsync(int id, string path)
        {
            try
            {
                var wwwPath = this.env.ContentRootPath;
                wwwPath = wwwPath + "Uploads\\";
                string imageFileName = await _user.Users
                    .Where(u => u.Id == id)
                    .Select(u =>u.ProfilePicName) 
                    .FirstOrDefaultAsync();

                var _path = Path.Combine(wwwPath, (path) , imageFileName);
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
        
        public bool Save()
        {
            var saved = _user.SaveChanges();
            return saved > 0 ? true : false;
        }
        public bool UpdateProfilePic(User user)
        {
            _user.Update(user);
            return Save();
        }
    }
}
