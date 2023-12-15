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

        public async Task<ICollection<User>> GetFriendsListAsync(int userId)
        {
            var friends = await _context.Friendships
                .Include(f => f.Profile)
                .Include(f => f.Friend)
                .Where(f => (f.ProfileId == userId) && f.isFriend == true)
                .Select(f =>
                    f.ProfileId == userId ? f.Friend : f.Profile
                )
                .ToListAsync();

            return friends;
        }
        public async Task<bool> RemoveFriendAsync(int profileId, int friendId)
        {
            var friendship = await _context.Friendships.FirstOrDefaultAsync(f =>
                (f.ProfileId == profileId && f.FriendId == friendId));

            if (friendship != null)
            {
                _context.Friendships.Remove(friendship);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

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
        public async Task<bool> DeclineFriendRequestAsync(int profileId, int friendId)
        {
            var friendship = await _context.Friendships.FirstOrDefaultAsync(f =>
                f.ProfileId == friendId && f.FriendId == profileId && f.Status == "pending");

            if (friendship != null)
            {
                _context.Friendships.Remove(friendship);
                await _context.SaveChangesAsync();
                return true; 
            }

            return false; 
        }



        public async Task<bool> AcceptFriendRequestAsync(int userId, int friendId)
        {
            var friendship = await _context.Friendships.FirstOrDefaultAsync(f =>
                f.ProfileId == friendId && f.FriendId == userId && f.Status == "pending");

            if (friendship != null)
            {
                friendship.Status = "accepted";
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<int> GetSumOfFriendsAsync(int userId)
        {
            var friends = await GetFriendsListAsync(userId);
            return friends.Count();
        }

        public async Task<ICollection<UserDto>> GetPendingFriendRequestsAsync(int userId)
        {
            var pendingFriendRequests = await _context.Friendships
                .Include(f => f.Friend)
                .Where(f => (f.ProfileId == userId) && f.Status == "pending")
                .Select(f => new UserDto
                {
                    Id = f.FriendId,
                    FirstName = f.Friend.FirstName,
                    Surname = f.Friend.Surname,
                    ProfilePicName = f.Friend.ProfilePicName
                })
                .ToListAsync();

            return pendingFriendRequests;
        }

        public async Task<bool?> GetFriendshipAsync(int userId, int friendId)
        {
            var getFriendship = await _context.Friendships
                .FirstOrDefaultAsync(f => 
                f.ProfileId == userId && f.FriendId == friendId);
            if(getFriendship != null)
            {
                return getFriendship.isFriend;
            }
            else { 
                return null; 
            }

                
        }

    }
}
