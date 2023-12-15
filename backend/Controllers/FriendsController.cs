using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using backend.Controllers;
using backend.Models;
using backend.Data;
using System.Runtime.InteropServices;
using Microsoft.AspNetCore.Components.Forms;

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

        [HttpPost("/addFriend/{userId}")]

        public async Task<IActionResult> SendFriendRequest(int userId, int friendId)
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
        [HttpDelete("declineFriendRequest/{userId}")]
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


        [HttpPost("acceptFriendRequest/{userId}")]
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

        [HttpGet("sumOfFriends/{userId}")]
        public async Task<IActionResult> GetSumOfFriends(int userId)
        {
            int sum = await _friendsRepository.GetSumOfFriendsAsync(userId);

            return Ok(sum);
        }
            
        [HttpDelete("unfriend/{userId}")]
        public async Task<IActionResult> DeleteFriendship(int userId, int friendId)
        {
            bool isDeleted = await _friendsRepository.RemoveFriendAsync(userId, friendId);
            if (isDeleted)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }

        }

        [HttpGet("pendingFriendRequests/{userId}")]
        public async Task<IActionResult> GetPendingFriendRequests(int userId)
        {
            var pendingFriendRequests = await _friendsRepository.GetPendingFriendRequestsAsync(userId);

            if (pendingFriendRequests == null || pendingFriendRequests.Count == 0)
            {
                return NotFound("No pending friend requests found for the given user ID.");
            }

            return Ok(pendingFriendRequests);
        }
        [HttpGet("getFriendship/{userId}")]
        public async Task<IActionResult> getFriendshipAsync(int userId, int friendId)
        {
            var frienship = await _friendsRepository.GetFriendshipAsync(userId, friendId);

            if(frienship == null)
            {
                return Ok("notFriends");
            }

            return Ok(frienship);
        }
    }
}
