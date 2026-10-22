using HelpdeskApp.Enums;

namespace HelpdeskApp.DTO
{
    public class UpdateTicketDTO
    {
        public Guid Id { get; set; }
        public Priority Priority { get; set; }
        public Status Status { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
