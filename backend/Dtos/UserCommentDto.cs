using FacebookClone.Models;

namespace backend.Dtos
{
    public class UserCommentDto
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string ProfilePicName { get; set; }
        public ICollection<CommentDto> Comments { get; set; }
    }
}
