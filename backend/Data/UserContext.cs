﻿using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class UserContext : DbContext
    {

        public UserContext(DbContextOptions<UserContext> options): base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });
        }
    }
}
