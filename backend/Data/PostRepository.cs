using backend.Models;
using FacebookClone.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class PostRepository : IPostRepository
    {
        private readonly UserContext _user;

        public PostRepository(UserContext user)
        {
            _user = user;
        }
        public async Task<List<User>> GetPostsByidAsync(int id)
        {
            return await _user.Users
                .Where(u => u.Id == id)
                .Include(u => u.Posts)
                .ToListAsync();
        }
    }
}
