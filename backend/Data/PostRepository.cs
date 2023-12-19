using backend.Dtos;
using backend.Models;
using FacebookClone.Models;
using Microsoft.Data.SqlClient.DataClassification;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Security.Policy;

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
                               where post.UserId == id
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

        public async Task<ICollection<CommentDto>> GetCommentsByPostIdAsync(int id)
        {
            var comments = await _user.Comments
                .Where(c => c.PostId == id)
                .Include(c => c.User)
                .OrderBy(comment => comment.TimeStamp)
                .Select(c => new CommentDto
                {
                    Id = c.Id,
                    Content = c.Content,
                    Timestamp = c.TimeStamp,
                    User = new UserDto
                    {
                        Id = c.User.Id,
                        FirstName = c.User.FirstName,
                        Surname = c.User.Surname,
                        ProfilePicName = c.User.ProfilePicName
                    }
                })
                .ToListAsync();

            return comments;
        }

        /// <summary>
        /// Creates the post asynchronous.
        /// </summary>
        /// <param name="post">The post.</param>
        /// <returns>The created post.</returns>
        /// <exception cref="Exception">Exception.</exception>
        /// <exception cref="Exception">Exception.</exception>

        public async Task<Post> CreatePostAsync(Post post)
        {
            await _user.Posts.AddAsync(post);
            await _user.SaveChangesAsync();

            return post;
        }

        /// <summary>
        /// Updates the post asynchronous.
        /// </summary>
        /// <param name="post">The post.</param>
        /// <returns>The updated post.</returns>
        /// <exception cref="Exception">Exception.</exception>
        /// <exception cref="Exception">Exception.</exception>

        public async Task<CommentDto> CreateCommentAsync(Comment comment)
        {
            _user.Comments.Add(comment);
            _user.SaveChanges();

            CommentDto? comm = await _user.Comments
                .Where(c => c.Id == comment.Id)
                .Include(c => c.User)
                .Select(c => new CommentDto
                {
                    Id = c.Id, 
                    Content = c.Content,
                    Timestamp = c.TimeStamp,
                    User = new UserDto
                    {
                        Id = c.User.Id,
                        FirstName = c.User.FirstName,
                        Surname = c.User.Surname,
                        ProfilePicName = c.User.ProfilePicName
                    }
                }).FirstOrDefaultAsync();

            return comm;
        }

        /// <summary>
        /// Gets the likes by post id asynchronous.
        /// </summary>
        /// <param name="id">The post Id.</param>
        /// <returns>The likes.</returns>
        /// <exception cref="Exception">Exception.</exception>

        public async Task<ICollection<Like>> GetLikesByPostIdAsync(int id)
        {
            var likes = await _user.Likes
                .Where(l => l.PostId  == id)
                .ToListAsync();

            return likes;
        }

        public async Task<Like> CreateLikeByPostIdAsync(Like like)
        {
            var existingLike = await _user.Likes.FirstOrDefaultAsync(l =>
                (l.PostId == like.PostId && l.UserId == like.UserId));

            if(existingLike != null)
            {
                return existingLike;
            }
            else
            {
                await _user.Likes.AddAsync(like);
                await _user.SaveChangesAsync();

                return like;
            }

        }

        /// <summary>
        /// Removes the like asynchronous.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <param name="postId">The post identifier.</param>

        public async Task<bool> RemoveLikeAsync(int userId, int postId)
        {
            var like = await _user.Likes.FirstOrDefaultAsync(l =>
                (l.PostId == postId && l.UserId== userId));

            if ( like != null)
            {
                _user.Likes.Remove(like);
                await _user.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}

