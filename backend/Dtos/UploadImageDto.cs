namespace backend.Dtos
{
    public class UploadImageDto
    {
        [NotMapped]
        public IFormFile? ImageFile{ get; set; }
    }
}