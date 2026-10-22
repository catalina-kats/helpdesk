using HelpdeskApp.Enums;

namespace HelpdeskApp.DTO
{
    public class UpdateTicketStatusDTO
    {
        public Guid Id { get; set; }
        public Status Status { get; set; }
    }
}
