using backend.Models;
using FacebookClone.Models;

namespace backend.Data
{
    public interface IPostRepository
    {
        Task<ICollection<Comment>> GetCommentsByPostIdAsync(int id);
        Task<UserPostDto> GetPostsByidAsync(int id);
    }
}
