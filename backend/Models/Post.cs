using backend.Models;

namespace FacebookClone.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string MediaFileName { get; set; }
        public string Description { get; set; }
        public DateTime TimeStamp { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public ICollection<Like> Likes { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
