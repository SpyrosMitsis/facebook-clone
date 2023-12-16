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
        
        /// <summary>
        /// Gets the posts by id.
        /// </summary>
        /// <param name="id">The id.</param>
        /// <returns>The posts.</returns>
        /// <exception cref="Exception">Exception.</exception>
        /// <exception cref="Exception">Exception.</exception>

       public async Task<ICollection<PostDto>> GetPostsByidAsync(int id)
        {
                var posts = await (from post in _user.Posts
                       where post.UserId== id 
                       orderby post.TimeStamp
                       select new PostDto
                       {
                           Id = post.Id,
                           MediaFileName = post.MediaFileName,
                           Description = post.Description,
                           TimeStamp = post.TimeStamp,
                           User = new UserDto
                           {
                               Id = post.User.Id,
                               FirstName = post.User.FirstName,
                               Surname = post.User.Surname,
                               ProfilePicName = post.User.ProfilePicName
                           }
                       }).ToListAsync();



            return posts;


        }
        /// <summary>
        /// Gets the posts need for the homepage of the user asynchronous.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>The posts.</returns>

        public async Task<ICollection<PostDto>> GetPostsHomeAsync(int id)
        {
                var posts = await (from post in _user.Posts
                       join friendship in _user.Friendships
                       on post.UserId equals friendship.FriendId
                       where friendship.ProfileId == id && friendship.isFriend == true
                       orderby post.TimeStamp
                       select new PostDto
                       {
                           Id = post.Id,
                           MediaFileName = post.MediaFileName,
                           Description = post.Description,
                           TimeStamp = post.TimeStamp,
                           User = new UserDto
                           {
                               Id = post.User.Id,
                               FirstName = post.User.FirstName,
                               Surname = post.User.Surname,
                               ProfilePicName = post.User.ProfilePicName
                           }
                       }).ToListAsync();
            return posts;
        }

        /// <summary>
        /// Gets the comments by post id asynchronous.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>The comments.</returns>
        /// <exception cref="Exception">Exception.</exception>
        /// <exception cref="Exception">Exception.</exception>

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


        }
    };

}

