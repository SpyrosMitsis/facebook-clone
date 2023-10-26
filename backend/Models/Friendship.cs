namespace FacebookClone.Models
{
    public class Friendship
    {
        public int Id { get; set; }
        public enum Status
        {
            Pending,
            Accepted,
            Rejected
        }
        
    }
}
