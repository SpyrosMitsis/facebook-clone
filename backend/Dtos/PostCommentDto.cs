namespace backend.Dtos
{
    public class PostCommentDto
    {
        public int UserId { get; set; }
        public int PostId { get; set; }
        public string Content { get; set; }
    }
}
