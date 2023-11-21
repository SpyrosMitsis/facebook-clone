using backend.Models;
using FacebookClone.Models;

namespace backend.Data
{
    public interface IPostRepository
    {
        Task<List<User>> GetPostsByidAsync(int id);
    }
}
