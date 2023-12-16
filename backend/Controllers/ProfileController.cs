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


        /// <summary>
        /// Uploads a profile picture for a user.
        /// </summary>
        /// <param name="account">The user account data.</param>
        /// <param name="userId">The user ID.</param>
        /// <returns>The updated user.</returns>

        [HttpPatch("uploadProfilePic")]
        public async Task<IActionResult> UploadProfilePic([FromForm] UploadProfilePicDto account, int userId)
        {
            var user = await _repository.GetByIdAsync(userId);
            var fileName = _repository.UploadImage(account.ProfilePic, userId, "ProfilePics" );
            user.ProfilePicName = fileName;

            var userResult = _repository.UpdateUser(user);
            if (userResult)
            {
                return Ok();
            }
            else
            {

                return NotFound();
            }
        }

        /// <summary>
        /// Deletes a profile picture for a user.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <returns>The updated user.</returns>

        [HttpPatch("deleteProfilePic")]
        public async Task<IActionResult> DeleteProfilePic(int userId)
        {
            var user = await _repository.GetByIdAsync(userId);
            bool isDeleted = await _repository.RemoveImageAsync(userId, "ProfilePics");
            if (isDeleted)
            {
                user.ProfilePicName = null;
                var userResult = _repository.UpdateUser(user);
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

        /// <summary>
        /// Uploads a cover picture for a user.
        /// </summary>
        /// <param name="account">The user account data.</param>
        /// <param name="userId">The user ID.</param>
        /// <returns>The updated user.</returns>

        [HttpPatch("uploadCoverPic")]
        public async Task<IActionResult> UploadCoverPic([FromForm] UploadProfilePicDto account, int userId)
        {
            var user = await _repository.GetByIdAsync(userId);
            var fileName = _repository.UploadImage(account.ProfilePic, userId, "CoverPics" );
            user.BannerFileName = fileName;

            var userResult = _repository.UpdateUser(user);
            if (userResult)
            {
                return Ok();
            }
            else
            {

                return NotFound();
            }
        }

        /// <summary>
        /// Deletes a cover picture for a user.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <returns>The updated user.</returns>

        [HttpPatch("deleteCoverPic")]
        public async Task<IActionResult> DeleteCoverPic(int userId)
        {
            var user = await _repository.GetByIdAsync(userId);
            bool isDeleted = await _repository.RemoveImageAsync(userId, "CoberPics");
            if (isDeleted)
            {
                user.BannerFileName = null;
                var userResult = _repository.UpdateUser(user);
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

        /// <summary>
        /// Gets a user by ID.
        /// </summary>
        /// <param name="id">The user ID.</param>
        /// <returns>The user.</returns>

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

        /// <summary>
        /// Updates a user's profile.
        /// </summary> 
        /// <param name="id">The user ID.</param>
        /// <param name="updatedUser">The updated user data.</param>
        /// <returns>The updated user.</returns>

        [HttpPatch("UpdateBio/{id}")]
        public async Task<IActionResult> UpdateBio(int id, [FromBody] UpdateBioDto updatedBio)
        {
            var user = await _repository.GetByIdAsync(id);
            user.Bio = updatedBio.Bio;
            if (user == null)
            {
                return NotFound();
            }
            var userResult = _repository.UpdateUser(user);

            if (userResult)
            {
                return Ok("Bio updated successfully");
            }
            else
            {

                return StatusCode(500, "An error occurred while updating the bio.");

            }
        }
        /// <summary>
        /// Deletes a user's profile.
        /// </summary> 
        /// <param name="userId">The user ID.</param>
        /// <returns>The updated user.</returns>

        [HttpPatch("DeleteBio/{userId}")]

        public async Task<IActionResult> DeleteBio(int userId)
        {
            var user = await _repository.GetByIdAsync(userId);
            user.Bio = null;
            var userResult = _repository.UpdateUser(user);
            if (userResult)
            {
                return Ok("Bio deleted successfully");
            }
            else
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }

        }

        /// <summary>
        /// Gets all users.
        /// </summary>
        /// <returns>The users.</returns>
        [HttpGet("Users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _repository.GetUsersAsync();
            if(users == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(users);
            }
        }
    }
}
