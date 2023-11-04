using backend.Dtos;
using backend.Models;
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

        public User GetByEmail(string email)
        {
            return _user.Users.FirstOrDefault(u => u.Email == email);
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _user.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public string UploadProfilePic(IFormFile imageFile, int id)
        {

            try
            {
                var contentPath = this.env.ContentRootPath;
                // path = "c://projects/productminiapi/uploads" ,not exactly something like that
                var path = Path.Combine(contentPath, "Uploads");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
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
                var fileWithPath = Path.Combine(path, newFileName);
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

        public bool RemoveProfilePic(string imageFileName)
        {
            try
            {
                var wwwPath = this.env.WebRootPath;
                var path = Path.Combine(wwwPath, "Uploads\\", imageFileName);
                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
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
