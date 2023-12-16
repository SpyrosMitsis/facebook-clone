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

        /// <summary>
        /// Gets the list of friends for a given user.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <returns>The list of friends.</returns>

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

        /// <summary>
        /// Sends a friend request from one user to another.
        /// </summary>
        /// <param name="userId">The user ID of the sender.</param>
        /// <param name="friendId">The user ID of the recipient.</param>
        /// <returns>True if the friend request was sent, false otherwise.</returns>

        [HttpPost("addFriend/{userId}")]
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
        /// <summary>
        /// Declines a friend request from one user to another.
        /// </summary>
        /// <param name="userId">The user ID of the recipient.</param>
        /// <param name="friendId">The user ID of the sender.</param>
        /// <returns>True if the friend request was declined, false otherwise.</returns>

        [HttpDelete("declineFriendRequest/{userId}")]
        public async Task<IActionResult> DeclineFriendRequest(int userId, int friendId)
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

        /// <summary>
        /// Accepts a friend request from one user to another.
        /// </summary>
        /// <param name="userId">The user ID of the recipient.</param>
        /// <param name="friendId">The user ID of the sender.</param>
        /// <returns>True if the friend request was accepted, false otherwise.</returns>

        [HttpPatch("acceptFriendRequest/{userId}")]
        public async Task<IActionResult> AcceptFriendRequest(int userId, int friendId)
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

        /// <summary>
        /// Gets the sum of friends for a given user.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <returns>The sum of friends.</returns>

        [HttpGet("sumOfFriends/{userId}")]
        public async Task<IActionResult> GetSumOfFriends(int userId)
        {
            int sum = await _friendsRepository.GetSumOfFriendsAsync(userId);

            return Ok(sum);
        }
         /// <summary>
        /// Removes a friend from a user's friend list.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <param name="friendId">The friend ID.</param>
        /// <returns>True if the friend was removed, false otherwise.</returns>
        
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
        /// <summary>
        /// Gets the list of pending friend requests for a given user.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <returns>The list of pending friend requests.</returns>

        [HttpGet("pendingFriendRequests/{userId}")]
        public async Task<IActionResult> GetPendingFriendRequests(int userId)
        {
            var pendingFriendRequests = await _friendsRepository.GetPendingFriendRequestsAsync(userId);

            if (pendingFriendRequests == null)
            {
                return NotFound("No pending friend requests found for the given user ID.");
            }

            return Ok(pendingFriendRequests);
        }
        /// <summary>
        /// Gets the friendship status between two users.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <param name="friendId">The friend ID.</param>
        /// <returns>The friendship status, friends if they are friends, 
        /// userSent if the user sent the friend request
        /// friendSent if the friend sent the friend request
        /// notFriends if they are not friends.</returns>
        
        [HttpGet("getFriendship/{userId}")]
        public async Task<IActionResult> getFriendshipAsync(int userId, int friendId)
        {
            var frienship = await _friendsRepository.GetFriendshipAsync(userId, friendId);

            return Ok(frienship);
        }
    }
}
