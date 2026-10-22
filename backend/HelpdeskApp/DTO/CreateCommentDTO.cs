using HelpdeskApp.Models;
using System.ComponentModel.DataAnnotations;

namespace HelpdeskApp.DTO
{
    public class CreateCommentDTO
    {

        public Guid? TicketId { get; set; }
        [Required]
        [MinLength(3, ErrorMessage = "Text comment must contain at least 3 characters")]
        [MaxLength(300, ErrorMessage = "Text comment cannot exceed 300 characters")]
        public string Text { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;
    }
}
