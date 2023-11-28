using backend.Data;
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
        
    }
}
