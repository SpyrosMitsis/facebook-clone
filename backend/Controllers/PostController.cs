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
        
    }
}
