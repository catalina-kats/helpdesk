using AutoMapper;
using HelpdeskApp.DTO;
using HelpdeskApp.Interfaces;
using HelpdeskApp.Models;
using HelpdeskApp.Query;
using Microsoft.AspNetCore.Mvc;

namespace HelpdeskApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IMapper _mapper;
        public TicketController(ITicketRepository ticketRepository, IMapper mapper)
        {
            _ticketRepository = ticketRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Fetch tickets by filter
        /// </summary>
        /// <param name="q">Pagination and filter options.</param>
        /// <param name="ct">Cancellation token.</param>
        /// <returns>Paginated list of tickets.</returns>
        /// <response code="200">Tickets fetched successfully.</response>
        [HttpGet]
        public async Task<ActionResult<PagedResult<TicketDTO>>> GetAll(
            [FromQuery] Query.Query q, CancellationToken ct)
        {
            var tickets = await _ticketRepository.GetAll(q, ct);
            return Ok(tickets);
        }

        /// <summary>
        /// Fetch ticket by id
        /// </summary>
        /// <returns>Ticket.</returns>
        /// <response code="200">Ticket fetched successfully.</response>
        [HttpGet("{id}")]
        public async Task<ActionResult<TicketDTO>> GetById(
            [FromRoute] Guid id)
        {
            var ticket = await _ticketRepository.GetById(id);
            return Ok(ticket);
        }

        /// <summary>
        /// Update ticket
        /// </summary>
        /// <returns>Ticket updated.</returns>
        /// <response code="200">Ticket updated successfully.</response>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateTicketDTO updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var ticket = await _ticketRepository.UpdateAsync(id, updateDto);

            if (ticket == null)
            {
                return NotFound("Comment not found");
            }

            return Ok(ticket);
        }

        /// <summary>
        /// Update status of ticket
        /// </summary>
        /// <returns>Ticket status updated.</returns>
        /// <response code="200">Ticket status updated successfully.</response>
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus([FromRoute] Guid id, [FromBody] UpdateTicketStatusDTO updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var ticket = await _ticketRepository.UpdateStatusAsync(id, updateDto);

            if (ticket == null)
            {
                return NotFound("Comment not found");
            }

            return Ok(ticket);
        }


        /// <summary>
        /// Create a ticket
        /// </summary>
        /// <returns>Ticket created.</returns>
        /// <response code="201">Ticket created successfully.</response>
        [HttpPost]
        public async Task<IActionResult> Create(CreateTicketDTO ticketDTO)
        {
            var user = Request.Headers["X-User"];
            if (string.IsNullOrEmpty(user))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            ticketDTO.CreatedBy = user;
            var ticket = _mapper.Map<Ticket>(ticketDTO);
            await _ticketRepository.CreateAsync(ticket);

            var result = _mapper.Map<TicketDTO>(ticket);

            return CreatedAtAction(nameof(Create), new { id = ticket.Id }, result);
        }

    }
}
