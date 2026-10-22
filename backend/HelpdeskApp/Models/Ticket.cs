using HelpdeskApp.Enums;

namespace HelpdeskApp.Models
{
    public class Ticket
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Priority Priority { get; set; }
        public Status Status { get; set; } = Status.Open;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string CreatedBy { get; set; }
        public List<Comment> Comments = new List<Comment>();

    }
}
