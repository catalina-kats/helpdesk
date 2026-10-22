using HelpdeskApp.Models;

namespace HelpdeskApp.Interfaces
{
    public interface ICommentRepository
    {
        Task<IEnumerable<Comment>> GetByTicketId(Guid TicketId);
        Task<Comment> CreateAsync(Comment comment);
    }
}
