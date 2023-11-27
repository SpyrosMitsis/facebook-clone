using backend.Dtos;
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
        public async Task<UserPostDto> GetPostsByidAsync(int id)
        {
            var user = await _user.Users
                .Where(u => u.Id == id)
                .Include(u => u.Posts)
                .FirstOrDefaultAsync();

            if (user != null)
            {
                var userPostDto = new UserPostDto
                {
                    UserId = user.Id,
                    FirstName = user.FirstName,
                    Surname = user.Surname,
                    profilePicName = user.ProfilePicName,
                    Posts = user.Posts.ToList()
                };

                return userPostDto ;
            }

            return new UserPostDto(); // Return an empty list if the user is not found
        }
        public async Task<ICollection<Comment>> GetCommentsByPostIdAsync(int id)
        {
            var posts = await _user.Posts
                .Where(u => u.Id == id)
                .Include(u => u.Comments)
                .FirstOrDefaultAsync();


            if (posts!= null)
            { 
                return posts.Comments.ToList();
            }
            else
            {
                return new List<Comment>();
            }
        }
};

}

