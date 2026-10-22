using HelpdeskApp.Infrastructure;
using HelpdeskApp.Interfaces;
using HelpdeskApp.Models;
using HelpdeskApp.Query;
using Microsoft.EntityFrameworkCore;

namespace HelpdeskApp.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _context;
        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Comment>> GetByTicketId(Guid TicketId)
        {
            return await _context.Comments.Where(c => c.TicketId == TicketId).ToListAsync();

        }
        public async Task<Comment> CreateAsync(Comment comment)
        {
            comment.CreatedAt = DateTime.Now;
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
            return comment;
        }
    }
}
