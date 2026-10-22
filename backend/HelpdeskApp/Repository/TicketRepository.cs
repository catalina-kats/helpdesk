using AutoMapper;
using HelpdeskApp.DTO;
using HelpdeskApp.Enums;
using HelpdeskApp.Infrastructure;
using HelpdeskApp.Interfaces;
using HelpdeskApp.Models;
using HelpdeskApp.Query;
using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;

namespace HelpdeskApp.Repository
{
    public class TicketRepository : ITicketRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public TicketRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<PagedResult<TicketDTO>> GetAll(Query.Query q, CancellationToken ct)
        {
            IQueryable<Ticket> query = _context.Tickets.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(q.Search))
            {
                query = query.Where(o => o.Title.Contains(q.Search) || o.Description.Contains(q.Search));
            }

            if (q.Priority.HasValue && !q.Priority.Equals(-1))
            {
                Priority priority = (Priority)q.Priority;
                query = query.Where(o => o.Priority.Equals(priority));
            }

            if (q.Status.HasValue && !q.Status.Equals(-1))
            {
                Status status = (Status)q.Status;
                query = query.Where(o => o.Status.Equals(status));
            }
            /*
            if (!string.IsNullOrWhiteSpace(q.Status))
                query = query.Where(o => o.Status == q.Status);
            */
            if (q.CreatedFrom.HasValue)
                query = query.Where(o => o.CreatedAt >= q.CreatedFrom.Value);

            if (q.CreatedTo.HasValue)
                query = query.Where(o => o.CreatedAt <= q.CreatedTo.Value);

            query = (q.SortBy?.ToLower(), q.Desc) switch
            {
                ("priority", false) => query.OrderBy(o => o.Priority),
                ("priority", true) => query.OrderByDescending(o => o.Priority),
                ("status", false) => query.OrderBy(o => o.Status),
                ("status", true) => query.OrderByDescending(o => o.Status),
                ("createdat", false) => query.OrderBy(o => o.CreatedAt),
                _ => query.OrderByDescending(o => o.CreatedAt),
            };

            var result = await query
                .Select(t => _mapper.Map<TicketDTO>(t))
                .ToPagedResultAsync(q.Page, q.PageSize, ct);
            return result;
        }

        public async Task<Ticket> GetById(Guid id)
        {
            var existingTicket = await _context.Tickets.FindAsync(id);
            return existingTicket;
        }
        public async Task<Ticket> CreateAsync(Ticket ticket)
        {
            ticket.CreatedAt = DateTime.Now;
            await _context.Tickets.AddAsync(ticket);
            await _context.SaveChangesAsync();
            return ticket;
        }
        public async Task<TicketDTO?> UpdateAsync(Guid id, UpdateTicketDTO ticketDTO)
        {
            var existingTicket = await _context.Tickets.FindAsync(id);

            if (existingTicket == null)
            {
                return null;
            }

            existingTicket.Status = ticketDTO.Status;
            existingTicket.Priority = ticketDTO.Priority;
            existingTicket.Title = ticketDTO.Title;
            existingTicket.Description = ticketDTO.Description;
            existingTicket.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return _mapper.Map<TicketDTO>(existingTicket);
        }

        public async Task<TicketDTO?> UpdateStatusAsync(Guid id, UpdateTicketStatusDTO ticketDTO)
        {
            var existingTicket = await _context.Tickets.FindAsync(id);

            if (existingTicket == null)
            {
                return null;
            }

            existingTicket.Status = ticketDTO.Status;
            existingTicket.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return _mapper.Map<TicketDTO>(existingTicket);
        }
    }
}

