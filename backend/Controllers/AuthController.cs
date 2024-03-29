﻿using backend.Data;
using backend.Dtos;
using backend.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

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
        
        /// <summary>
        /// Registers a new user.
        /// </summary>
        /// <param name="dto">The user registration data.</param>
        /// <returns>The created user.</returns>
        /// <exception cref="Exception">Exception.</exception>
        /// <exception cref="Exception">Exception.</exception>

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

        /// <summary>
        /// Logs in a user.
        /// </summary>
        /// <param name="dto">The user login data.</param>
        /// <returns>The logged in user.</returns>
        /// <exception cref="Exception">Exception.</exception>
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto )
        {
            var user = await _repository.GetByEmailAsync(dto.Email);
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

        /// <summary>
        /// Logs out a user.
        /// </summary>
        /// <returns>The logged out user.</returns>
        /// <exception cref="Exception">Exception.</exception>

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
        /// <summary>
        /// Forgot password.
        /// </summary>
        /// <param name="dto">The user forgot password data.</param>
        /// <returns>The updated user.</returns>
        /// <exception cref="Exception">Exception.</exception>


        [HttpPatch("forgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)
        {
            var user = await _repository.GetByEmailAsync(dto.Email);

            if(user == null)
            {
                return NotFound( new
                {
                    message = "Email not Found!"
                });

            }
            else
            {
                if(dto.Password1 == dto.Password2)
                {
                    user.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password1);
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
                else
                {
                    return NotFound(new
                    {
                        message = "Passowords don't match!"
                    });
                }
            }
        }

    }
}

