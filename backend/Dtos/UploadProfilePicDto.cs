using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Dtos
{
    public class UploadProfilePicDto
    {
        [NotMapped]
        public IFormFile? ProfilePic { get; set; }
    }
}