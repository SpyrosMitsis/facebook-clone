using FacebookClone.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
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
        public DateTime DayOfJoyning { get; set; }
        public string Gender { get; set; }
        [AllowNull]
        public string? ProfilePicName { get; set; }
        public ICollection<Friendship> Friends { get; set; }
        public ICollection<Friendship> FriendsOf { get; set; }
        [AllowNull]
        public string? BannerFileName { get; set; }
        public ICollection<Post> Posts { get; set; }
        public ICollection<Like> Likes { get; set; }
        public ICollection<Comment> Comments { get; set; }

        [NotMapped]
        [System.Text.Json.Serialization.JsonIgnore]
        public IFormFile ProfilePic { get; set; }
        [NotMapped]
        [System.Text.Json.Serialization.JsonIgnore]
        public IFormFile BannerFile { get; set; }
        [AllowNull]
        public string? Bio { get; set; }

    }
}
