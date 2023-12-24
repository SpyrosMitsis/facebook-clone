using backend.Controllers;
using backend.Data;
using backend.Dtos;
using backend.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace backendTests.Controller
{
    internal class AuthControllerTest
    {
        public class AuthControllerTests
        {
            private readonly AuthController _controller;
            private readonly IUserRepository _repository;
            private readonly IJwtService _jwtService;

            public AuthControllerTests()
            {
                // Assuming UserContext and IWebHostEnvironment are required parameters
                var userContext = new Mock<UserContext>();
                var webHostEnvironment = new Mock<IWebHostEnvironment>();

                _repository = new UserRepository(userContext.Object, webHostEnvironment.Object);
                _jwtService = new JwtService();
                _controller = new AuthController(_repository, _jwtService);
            }

            [Fact]
            public async Task Register_ShouldCreateNewUser()
            {
                // Arrange
                var dto = new RegisterDto
                {
                    FirstName = "John",
                    Surname = "Doe",
                    Email = "johndoe@example.com",
                    Password = "password",
                    DateOfBirth = new DateTime(1990, 1, 1),
                    Gender = "male"
                };

                // Act
                var result = _controller.Register(dto);

                // Assert
                Assert.IsType<CreatedResult>(result);
                Assert.IsType<CreatedResult>(result);
                var user = (User)((CreatedResult)result).Value;
                Assert.NotNull(user);
                Assert.Equal(dto.FirstName, user.FirstName);
                Assert.Equal(dto.Surname, user.Surname);
                Assert.Equal(dto.Email, user.Email);
                Assert.Equal(BCrypt.Net.BCrypt.Verify(dto.Password, user.Password), true);
                Assert.Equal(dto.DateOfBirth, user.DateOfBirth);
                Assert.Equal(dto.Gender, user.Gender);
            }

            [Fact]
            public async Task Login_ShouldReturnJwt()
            {
                // Arrange
                var user = new User
                {
                    Id = 1,
                    FirstName = "John",
                    Surname = "Doe",
                    Email = "johndoe@example.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("password")
                };
                _repository.Users.Add(user)

                var dto = new LoginDto
                {
                    Email = "johndoe@example.com",
                    Password = "password"
                };

                // Act
                var result = await _controller.Login(dto);

                // Assert
                Assert.IsType<OkObjectResult>(result); // Adjust the expected type based on your actual implementation

                if (result is OkObjectResult okObjectResult)
                {
                    var jwt = (string)okObjectResult.Value;
                    Assert.NotNull(jwt);
                }
                else
                {
                    // Handle other result types if needed
                    Assert.Fail("Unexpected result type");
                }
            }

            [Fact]
            public async Task Logout_ShouldRemoveJwt()
            {
                // Arrange
                var user = new User
                {
                    Id = 1,
                    FirstName = "John",
                    Surname = "Doe",
                    Email = "johndoe@example.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("password")
                };
                _repository.Users.Add(user);

                // Act
                await _controller.Login(new LoginDto { Email = "johndoe@example.com", Password = "password" });
                _controller.Logout();

                // Assert
                Assert.Null(HttpContext.Current.Request.Cookies["jwt"]);
            }

            [Fact]
            public async Task ForgotPassword_ShouldUpdateUserPassword()
            {
                // Arrange
                var user = new User
                {
                    Id = 1,
                    FirstName = "John",
                    Surname = "Doe",
                    Email = "johndoe@example.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("password")
                };
                _repository.Users.Add(user);

                var dto = new ForgotPasswordDto
                {
                    Email = "johndoe@example.com",
                    Password1 = "newpassword",
                    Password2 = "newpassword"
                };

                // Act
                var result = await _controller.ForgotPassword(dto);

                // Assert
                Assert.IsType<OkResult>(result);
                Assert.Equal(BCrypt.Net.BCrypt.Verify("newpassword", user.Password), true);
            }
        }
    }
}
