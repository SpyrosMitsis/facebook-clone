using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName{ get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
    }
}
