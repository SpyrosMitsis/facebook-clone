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
        Task<ICollection<Like>> GetLikesByPostIdAsync(int id);
        Task<Like> CreateLikeByPostIdAsync(Like like);
        Task<bool> RemoveLikeAsync(int userId, int postId);
        string UploadImage(IFormFile imageFile, int id, string path);
        Task<Post> CreatePostAsync(Post post);
    }
}
