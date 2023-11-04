using backend.Data;
using backend.Dtos;
using backend.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace backend.Controllers
{
    [Route("/api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly IJwtService _jwtService;

        public AuthController(IUserRepository repository, IJwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }
        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = new User
            {
                FirstName = dto.FirstName,
                Surname = dto.Surname,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                DateOfBirth = dto.DateOfBirth,
                DayOfJoyning = DateTime.Now,
                Gender = dto.Gender
            };

            return Created("sucess", _repository.Create(user));
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto )
        {
            var user = _repository.GetByEmail(dto.Email);
            DateTime currentTime= DateTime.Today;
            DateTime expirationTime = currentTime.AddDays(7);
            TimeSpan timeDifference = expirationTime - currentTime;

            if(user == null)
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password)){
                return BadRequest(new { message = "Invalid Credentials" });
            }

            var jwt = _jwtService.Generate(user.Id, expirationTime );

           //Response.Cookies.Append("jwt", jwt, new CookieOptions
           //{
           //    HttpOnly = false
           //});

            return Ok(new
            {
                jwt,
                timeDifference.TotalMinutes,
                user
            });

        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new 
            { 
                message = "sucess"
            }
            );

        }
    }
}
