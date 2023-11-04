using backend.Dtos;
using backend.Models;

namespace backend.Data
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);
        Task<User> GetByIdAsync(int id);
        string UploadProfilePic(IFormFile imageFile, int id);
        bool RemoveProfilePic(string imageFileName);
        public bool Save();
        public bool UpdateProfilePic(User user);
    }
}
