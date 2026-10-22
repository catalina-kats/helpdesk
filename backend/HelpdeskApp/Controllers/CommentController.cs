using AutoMapper;
using HelpdeskApp.DTO;
using HelpdeskApp.Interfaces;
using HelpdeskApp.Models;
using HelpdeskApp.Query;
using HelpdeskApp.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HelpdeskApp.Controllers
{
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;
        public CommentController(ICommentRepository commentRepository, IMapper mapper)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Gets a list of comments by ticket Id.
        /// </summary>
        /// <param name="id">Ticket id.</param>
        /// <returns>A list of comments.</returns>
        /// <response code="200">Comments returned successfully.</response>
        [HttpGet("/api/comment/ticket/{id}")]
        public async Task<ActionResult<TicketDTO>> GetByTicketId(
            [FromRoute] Guid id)
        {
            var comments = await _commentRepository.GetByTicketId(id);
            var result = comments.Select(t => _mapper.Map<CommentDTO>(t));
            return Ok(result);
        }

        /// <summary>
        /// Create a comment
        /// </summary>
        /// <param name="id">Ticket id.</param>
        /// <returns>Comment created.</returns>
        /// <response code="201">Comment created successfully.</response>
        [HttpPost("/api/comment/ticket/{id}")]
        public async Task<IActionResult> Create([FromRoute] Guid id, CreateCommentDTO commentDTO)
        {
            var user = Request.Headers["X-User"];

            if (string.IsNullOrEmpty(user))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            commentDTO.CreatedBy = user;
            var comment = _mapper.Map<Comment>(commentDTO);
            await _commentRepository.CreateAsync(comment);

            var result = _mapper.Map<CommentDTO>(comment);

            return CreatedAtAction(nameof(Create), new { id = comment.Id }, result);
        }

    }
}
