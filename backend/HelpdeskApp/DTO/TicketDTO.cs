using HelpdeskApp.Enums;
using HelpdeskApp.Models;

namespace HelpdeskApp.DTO
{
    public class TicketDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Priority Priority { get; set; }
        public Status Status { get; set; } = Status.Open;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public string CreatedBy { get; set; }
        public List<Comment> Comments = new List<Comment>();
    }
}
