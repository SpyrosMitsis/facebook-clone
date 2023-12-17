using backend.Dtos;
using backend.Models;
using FacebookClone.Models;

namespace backend.Data
{
    public interface IPostRepository
    {

        Task<ICollection<CommentDto>> GetCommentsByPostIdAsync(int id);
        Task<ICollection<PostDto>> GetPostsByidAsync(int id);
        Task<ICollection<PostDto>> GetPostsHomeAsync(int id);
        Task<CommentDto> CreateCommentAsync(Comment comment);

    }
}
