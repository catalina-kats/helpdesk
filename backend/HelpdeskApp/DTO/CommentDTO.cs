using HelpdeskApp.Models;

namespace HelpdeskApp.DTO
{
    public class CommentDTO
    {
        public Guid Id { get; set; }
        public Guid? TicketId { get; set; }
        public Ticket? Ticket { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
    }
}
