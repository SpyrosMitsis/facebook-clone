﻿namespace FacebookClone.Models
{
    public class Like
    {
        public int Id { get; set; }
        public DateTime TimeStamp { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
    }
}
