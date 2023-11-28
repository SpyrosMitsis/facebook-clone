using FacebookClone.Models;

namespace backend.Dtos
{
    public class UserCommentDto
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string ProfilePicName { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
