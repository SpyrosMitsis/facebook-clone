namespace backend.Dtos
{
    public class PostDto
    {
        public int Id { get; set; }
        public string MediaFileName { get; set; }
        public string Description { get; set; }
        public DateTime TimeStamp { get; set; }
        public UserDto User { get; set; }
    }
}
