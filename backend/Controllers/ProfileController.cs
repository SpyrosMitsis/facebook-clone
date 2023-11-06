using backend.Data;
using backend.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("/api/User")]
    [ApiController]
    public class ProfileController : Controller
    {
        private readonly IUserRepository _repository;

        public ProfileController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpPatch("uploadProfilePic")]
        public async Task<IActionResult> UploadProfilePic([FromForm] UploadProfilePicDto account, int userId)
        {
            var user = await _repository.GetByIdAsync(userId);
            var fileName = _repository.UploadImage(account.ProfilePic, userId, "ProfilePics" );
            user.ProfilePicName = fileName;

            var userResult = _repository.UpdateProfilePic(user);
            if (userResult)
            {
                return Ok();
            }
            else
            {

                return NotFound();
            }
        }

        [HttpPatch("deleteProfilePic")]
        public async Task<IActionResult> DeleteProfilePic(int userId)
        {
            var user = await _repository.GetByIdAsync(userId);
            bool isDeleted = await _repository.RemoveImageAsync(userId, "ProfilePics");
            if (isDeleted)
            {
                user.ProfilePicName = null;
                var userResult = _repository.UpdateProfilePic(user);
                if (userResult)
                {
                    return Ok();
                }
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await _repository.GetByIdAsync(id);
                if (user == null)
                {
                    return NotFound(); // Returns a 404 if the user is not found
                }
                return Ok(user); // Returns a 200 with the user data
            }
            catch
            {
                // Optionally, log the exception or handle it as needed
                return StatusCode(500, "An error occurred while processing your request."); // Returns a 500 if there's an error
            }
        }
    }
}
