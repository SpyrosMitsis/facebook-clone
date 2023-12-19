using backend.Data;
using backend.Dtos;
using FacebookClone.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

    [Route("/api/Post")]
    [ApiController]
    public class PostController : Controller
    {
        private readonly IPostRepository _repository;


        public PostController(IPostRepository repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Gets the posts by id.
        /// </summary>
        /// <param name="id">The id.</param>
        /// <returns>The posts.</returns>
        /// <exception cref="Exception">Exception.</exception>

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPosts(int id)
        {
            try 
            {
                var posts = await _repository.GetPostsByidAsync(id);
                return Ok(posts);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
        /// <summary>
        /// Gets the posts need for the homepage of the user asynchronous.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>The posts.</returns>

        /// <summary>
        /// Gets the comments by post id asynchronous.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>The comments.</returns>

        [HttpGet("Home/{id}")]
        public async Task<IActionResult> GetFriendsPosts(int id)
        {
            try
            {
                var posts = await _repository.GetPostsHomeAsync(id);
                return Ok(posts);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        /// <summary>
        /// Gets the comments by post id asynchronous.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>The comments.</returns>

        [HttpGet("comment/{id}")]
        public async Task<IActionResult> GetComments(int id)
        {
            try
            {
                var comments = await _repository.GetCommentsByPostIdAsync(id);
                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        
        /// <summary>
        /// Makes the comment asynchronous.
        /// </summary>
        /// <param name="dto">The dto.</param>
        /// <returns>The action result.</returns>
        [HttpPost("makeComment")]

        public async Task<IActionResult> MakeCommentAsync ([FromBody] PostCommentDto dto)
        {
            var comment = new Comment
            {
                UserId = dto.UserId,
                PostId = dto.PostId,
                TimeStamp = DateTime.UtcNow,
                Content = dto.Content

            };
            var response = await _repository.CreateCommentAsync(comment);
            return Ok(response);
        }

        /// <summary>
        /// Gets the likes by post id asynchronous.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>The likes.</returns>

        [HttpGet("likes/{id}")]
        public async Task<IActionResult> GetLikesByPostIdAsync(int id)
        {
            var likes = await _repository.GetLikesByPostIdAsync(id);

            if(likes == null)
            {
                return Ok((int)0);
            }           

            return Ok(likes);
        }

        /// <summary>
        /// Makes the like by post id asynchronous.
        /// </summary>
        /// <param name="like">The like.</param>
        /// <returns>The action result.</returns>

        [HttpPost("makeLike")]

        public async Task<IActionResult> PostLikeByPostIdAsync([FromBody] LikeDto like)
        {
            var ll = new Like
            {
                UserId = like.UserId,
                PostId = like.PostId,
                TimeStamp = DateTime.UtcNow
            };

            var response = await _repository.CreateLikeByPostIdAsync(ll);

            return Created("Sucess",response);

        }

        /// <summary>
        /// Deletes the like asynchronous.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <param name="postId">The post identifier.</param>


        [HttpDelete("deleteLike/{userId}")]
        public async Task<IActionResult> DeleteFriendship(int userId, int postId)
        {
            bool isDeleted = await _repository.RemoveLikeAsync(userId, postId);
            if (isDeleted)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }

        }

    }
}
