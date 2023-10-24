namespace backend.Dtos
{
    public class RegisterDto
    {
        public string FirstName{ get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
    }
}
