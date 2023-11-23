using FacebookClone.Models;

public class UserPostDto
{
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string Surname { get; set; }
    public string profilePicName { get; set; }
    public List<Post> Posts { get; set; }
}