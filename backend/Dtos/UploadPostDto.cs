using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Dtos
{
    public class UploadPostDto
    {
        [NotMapped]
        public IFormFile? MediaFile { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
    }
}
