using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Dtos
{
    public class UploadImageDto
    {
        [NotMapped]
        public IFormFile? ProfilePic { get; set; }
    }
}