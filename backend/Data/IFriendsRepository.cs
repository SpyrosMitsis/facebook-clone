using backend.Models;

namespace backend.Data
{
    public interface IFriendsRepository
    {
        Task<ICollection<User>> GetFriendsListAsync(int userId);
        Task<bool> RemoveFriendAsync(int profileId, int friendId);
        Task<bool> SendFriendRequestAsync(int fromUserId, int toUserId);
        Task<bool> AcceptFriendRequestAsync(int profileId, int friendId);
        Task<bool> DeclineFriendRequestAsync(int profileId, int friendId);
        
    }
}
