using backend.Models;

namespace backend.Data
{
    public class UserRepository : IUserRepository
    {
        private UserContext _user;

        public UserRepository(UserContext user)
        {
            _user = user;
            
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

        public User GetById(int id)
        {
            return _user.Users.FirstOrDefault(u => u.Id== id);
        }
    }
}
