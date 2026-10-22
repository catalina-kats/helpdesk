using AutoMapper;
using HelpdeskApp.DTO;
using HelpdeskApp.Models;

namespace HelpdeskApp.MappingHelper
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<Comment, CommentDTO>().ReverseMap();
            CreateMap<CreateCommentDTO, Comment>();
        }
    }
}
