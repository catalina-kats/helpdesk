using HelpdeskApp.DTO;
using HelpdeskApp.Models;
using HelpdeskApp.Query;

namespace HelpdeskApp.Interfaces
{
    public interface ITicketRepository
    {
        Task<Ticket> CreateAsync(Ticket ticket);
        Task<PagedResult<TicketDTO>> GetAll(Query.Query q, CancellationToken ct);
        Task<Ticket> GetById(Guid id);
        Task<TicketDTO?> UpdateAsync(Guid id, UpdateTicketDTO ticketDTO);
        Task<TicketDTO?> UpdateStatusAsync(Guid id, UpdateTicketStatusDTO ticketDTO);
    }
}
