using backend.Dtos;
using backend.Models;

namespace backend.Data
{
    public interface IUserRepository
    {
        User Create(User user);
        Task<User> GetByEmailAsync(string email);
        Task<User> GetByIdAsync(int id);
        string UploadImage(IFormFile imageFile, int id, string path);
        Task<bool> RemoveImageAsync(int id, string path);
        public bool Save();
        public bool UpdateProfilePic(User user);
    }
}
