using backend.Dtos;
using backend.Models;
using FacebookClone.Models;

namespace backend.Data
{
    public interface IPostRepository
    {

        Task<ICollection<UserCommentDto>> GetCommentsByPostIdAsync(int id);
        Task<UserPostDto> GetPostsByidAsync(int id);
        Task<ICollection<Post>> GetPostsHomeAsync(int id);
    }
}
