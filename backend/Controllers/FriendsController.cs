using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using backend.Controllers;
using backend.Models;
using backend.Data;

namespace FacebookClone.Controllers
{
    [ApiController]
    [Route("api/Friend")]
    public class FriendsController : ControllerBase
    {
        private readonly IFriendsRepository _friendsRepository;

        public FriendsController(IFriendsRepository friendsRepository)
        {
            _friendsRepository = friendsRepository;
        }

        [HttpGet("friendList/{userId}")]
        public IActionResult GetFriendsList(int userId)
        {
            var friends = _friendsRepository.GetFriendsListAsync(userId).Result;

            if (friends == null || friends.Count == 0)
            {
                return NotFound("No friends found for the given user ID.");
            }

            return Ok(friends);
        }

        [HttpPost("{userId}/AddFriend/{friendId}")]

        public async Task<IActionResult> SendFriendRequest(int userId, [FromBody] int friendId)
        {
            
            var friendsList = await _friendsRepository.GetFriendsListAsync(userId);

            
            var isFriend = friendsList.Any(friend => friend.Id == friendId);

            if (isFriend)
            {
                return BadRequest("These users are already friends.");
            }
            else
            {
                bool sendFriendRequest = await _friendsRepository.SendFriendRequestAsync(userId, friendId);

                if (sendFriendRequest)
                {
                    return Ok("Friend request sent successfully.");
                }
                else
                {
                    return BadRequest("Failed to send friend request.");
                }
            }

            
        }
        [HttpPost("{userId}/DeclineFriendRequest")]
        public async Task<IActionResult> DeclineFriendRequest(int userId, [FromBody] int friendId)
        {
            // Check if there is a pending friend request from friendId to userId
            bool declined = await _friendsRepository.DeclineFriendRequestAsync(userId, friendId);

            if (declined)
            {
                return Ok("Friend request declined successfully.");
            }
            else
            {
                return BadRequest("Failed to decline friend request.");
            }
        }


        [HttpPost("{userId}/AcceptFriendRequest")]
        public async Task<IActionResult> AcceptFriendRequest(int userId, [FromBody] int friendId)
        {
            
            bool accepted = await _friendsRepository.AcceptFriendRequestAsync(userId, friendId);

            if (accepted)
            {
                return Ok("Friend request accepted successfully.");
            }
            else
            {
                return BadRequest("Failed to accept friend request.");
            }
        }


    }
}