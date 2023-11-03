using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Dtos
{
    public class UploadProfilePicDtpo
    {
        [NotMapped]
        public IFormFile? ProfilePic { get; set; }
    }
}