using backend.Models;
using FacebookClone.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class UserContext : DbContext
    {

        public UserContext(DbContextOptions<UserContext> options): base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Friendship> Friendships { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Post> Posts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });

            modelBuilder.Entity<Friendship>()
            .HasKey(uf => new { uf.ProfileId, uf.FriendId });

            modelBuilder.Entity<Friendship>()
                .HasOne(uf => uf.Profile)
                .WithMany(u => u.Friends)
                .HasForeignKey(uf => uf.ProfileId)
                .OnDelete(DeleteBehavior.Restrict); 

            modelBuilder.Entity<Friendship>()
                .HasOne(uf => uf.Friend)
                .WithMany(u => u.FriendOf)
                .HasForeignKey(uf => uf.FriendId)
                .OnDelete(DeleteBehavior.Restrict); 
        }
    }
}
