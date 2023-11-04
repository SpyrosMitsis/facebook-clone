using FacebookClone.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.PortableExecutable;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FirstName{ get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string ProfilePicName { get; set; }
        public ICollection<Friendship> Friends { get; set; }
        public ICollection<Friendship> FriendOf { get; set; }

        [NotMapped]
        public IFormFile ProfilePic { get; set; }

    }
}
