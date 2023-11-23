using backend.Models;
using FacebookClone.Models;

namespace backend.Dtos
{
    public class CommentsDto
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public Comment Comment { get; set; }

    }
}
