using backend.Dtos;
using backend.Models;
using FacebookClone.Models;
using Microsoft.Data.SqlClient.DataClassification;
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

            return new UserPostDto(); 
        }

        public async Task<ICollection<Post>> GetPostsHomeAsync(int id)
        {
            var posts = await (from post in _user.Posts
                         join friendship in _user.Friendships
                         on post.UserId equals friendship.FriendId
                         where friendship.ProfileId == id && friendship.isFriend == true
                         orderby post.TimeStamp
                         select post).ToListAsync();
            return posts;
        }


        public async Task<ICollection<UserCommentDto>> GetCommentsByPostIdAsync(int id)
        {
            var comments = await _user.Comments
               .Where(c => c.PostId == id)
               .Include(c => c.User)
               .GroupBy(c => c.UserId)
               .OrderBy(userGroup => userGroup.Min(comment => comment.TimeStamp)) 
               .Select( c => new UserCommentDto
               {
                   UserId= c.Key,
                   FirstName = c.First().User.FirstName,
                   Surname = c.First().User.Surname,
                   ProfilePicName = c.First().User.ProfilePicName,
                   Comments = c.First().User.Comments
                                .Where(c => c.PostId == id)
                                .OrderBy(comment => comment.TimeStamp)
                                .ToList()
               })
               .ToListAsync();

            return comments;

            //List<UserCommentDto> userCommentDtos = users.Select(u => new UserCommentDto {
            //    UserId = u.Id,
            //    FirstName = u.FirstName,
            //    Surname = u.Surname,
            //    profilePicName = u.ProfilePicName,
            //    Comments = u.Comments.ToList()
            //}).ToList();
            //
            //return userCommentDtos;

        }
    };

}

