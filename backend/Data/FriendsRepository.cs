using backend.Dtos;
using backend.Models;
using FacebookClone.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace backend.Data
{
    public class FriendsRepository : IFriendsRepository
    {
        private readonly UserContext _context;

        public FriendsRepository(UserContext context)
        {
            _context = context;
        }
        

        /// <summary>
        /// Gets the list of friends for a given user.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <returns>The list of friends.</returns>

        public async Task<ICollection<User>> GetFriendsListAsync(int userId)
        {
            var friends = await _context.Friendships
                .Include(f => f.Profile)
                .Include(f => f.Friend)
                .Where(f => ((f.ProfileId == userId) || f.FriendId == userId) && f.isFriend == true)
                .Select(f =>
                    f.ProfileId == userId ? f.Friend : f.Profile
                )
                .ToListAsync();

            return friends;
        }

        /// <summary>
        /// Removes a friend from a user's friend list.
        /// </summary>
        /// <param name="profileId">The user ID.</param>
        /// <param name="friendId">The friend ID.</param>
        /// <returns>True if the friend was removed, false otherwise.</returns>

        public async Task<bool> RemoveFriendAsync(int profileId, int friendId)
        {
            var friendship = await _context.Friendships.FirstOrDefaultAsync(f =>
                (f.ProfileId == profileId && f.FriendId == friendId) || (f.ProfileId == friendId && f.FriendId == profileId));

            if (friendship != null)
            {
                _context.Friendships.Remove(friendship);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        /// <summary>
        /// Sends a friend request from one user to another.
        /// </summary>
        /// <param name="fromUserId">The user ID of the sender.</param>
        /// <param name="toUserId">The user ID of the recipient.</param>
        /// <returns>True if the friend request was sent, false otherwise.</returns>

        public async Task<bool> SendFriendRequestAsync(int fromUserId, int toUserId)
        {
            var existingFriendship = await _context.Friendships.FirstOrDefaultAsync(f =>
                (f.ProfileId == fromUserId && f.FriendId == toUserId) || (f.ProfileId == toUserId && f.FriendId == fromUserId));

            if (existingFriendship != null)
            {
                
                return false;
            }


            var newFriendship = new Friendship
            {
                ProfileId = fromUserId,
                FriendId = toUserId,
                Status = "pending"
            };

            _context.Friendships.Add(newFriendship);
            await _context.SaveChangesAsync();
            return true; 

        }

        /// <summary>
        /// Declines a friend request from one user to another.
        /// </summary>
        /// <param name="profileId">The user ID of the recipient.</param>
        /// <param name="friendId">The user ID of the sender.</param>
        /// <returns>True if the friend request was declined, false otherwise.</returns>
        public async Task<bool> DeclineFriendRequestAsync(int profileId, int friendId)
        {
            var friendship = await _context.Friendships.FirstOrDefaultAsync(f =>
                f.ProfileId == friendId && f.FriendId == profileId && f.isFriend == false );

            if (friendship != null)
            {
                _context.Friendships.Remove(friendship);
                await _context.SaveChangesAsync();
                return true; 
            }

            return false; 
        }


        /// <summary>
        /// Accepts a friend request from one user to another.
        /// </summary>
        /// <param name="userId">The user ID of the recipient.</param>
        /// <param name="friendId">The user ID of the sender.</param>
        /// <returns>True if the friend request was accepted, false otherwise.</returns>

        public async Task<bool> AcceptFriendRequestAsync(int userId, int friendId)
        {
            var friendship = await _context.Friendships.FirstOrDefaultAsync(f =>
                f.ProfileId == friendId && f.FriendId == userId && f.Status == "pending");

            if (friendship != null)
            {
                friendship.Status = "Accepted";
                friendship.isFriend = true;
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        /// <summary>
        /// Gets the sum of friends for a given user.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <returns>The sum of friends.</returns>

        public async Task<int> GetSumOfFriendsAsync(int userId)
        {
            var friends = await GetFriendsListAsync(userId);
            return friends.Count();
        }

        /// <summary>
        /// Gets the list of pending friend requests for a given user.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <returns>The list of pending friend requests.</returns>
        public async Task<ICollection<UserDto>> GetPendingFriendRequestsAsync(int userId)
        {
            var pendingFriendRequests = await _context.Friendships
                .Include(f => f.Profile)
                .Where(f => (f.FriendId == userId) && f.Status == "pending")
                .Select(f => new UserDto
                {
                    Id = f.ProfileId,
                    FirstName = f.Profile.FirstName,
                    Surname = f.Profile.Surname,
                    ProfilePicName = f.Profile.ProfilePicName
                })
                .ToListAsync();

            return pendingFriendRequests;
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

        public async Task<string> GetFriendshipAsync(int userId, int friendId)
        {
            var getFriendship = await _context.Friendships.FirstOrDefaultAsync(f =>
                (f.ProfileId == userId && f.FriendId == friendId) || (f.ProfileId == friendId && f.FriendId == userId));

            if (getFriendship != null)
            {
                if (getFriendship.isFriend)
                {
                    return "friends";
                }
                else if(getFriendship.ProfileId == userId)
                {
                    return "userSent";
                }
                else
                {
                    return "friendSent";
                }
            }
            else {
                return "notFriends";
            }

                
        }

    }
}
