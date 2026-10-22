using HelpdeskApp.Enums;
using System.ComponentModel.DataAnnotations;

namespace HelpdeskApp.DTO
{
    public class CreateTicketDTO
    {
        [Required]
        [MinLength(3, ErrorMessage = "Title must contain at least 3 characters")]
        [MaxLength(50, ErrorMessage = "Title cannot exceed 50 characters")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MinLength(3, ErrorMessage = "Description must contain at least 3 characters")]
        [MaxLength(300, ErrorMessage = "Description cannot exceed 300 characters")]
        public string Description { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;
        public Status Status { get; set; } = Status.Open;

        [Required]
        public Priority Priority { get; set; } = Priority.Low;



    }
}
