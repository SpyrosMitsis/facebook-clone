using backend.Models;

namespace FacebookClone.Models
{
    public class Friendship
    {
        public int Id { get; set; }
        public int ProfileId { get; set; }
        public User Profile{ get; set; }

        public int FriendId { get; set; }
        public User Friend { get; set; }

        public string? Status { get; set; }
        public bool isFriend { get; set; }

    }
}
