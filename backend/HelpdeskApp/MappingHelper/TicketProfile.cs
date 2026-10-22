using AutoMapper;
using HelpdeskApp.DTO;
using HelpdeskApp.Models;

namespace HelpdeskApp.MappingHelper
{
    public class TicketProfile : Profile
    {
        public TicketProfile()
        {
            CreateMap<Ticket, TicketDTO>().ReverseMap();
            CreateMap<CreateTicketDTO, Ticket>();
            CreateMap<UpdateTicketDTO, TicketDTO>();
            CreateMap<UpdateTicketStatusDTO, TicketDTO>();
        }
    }
}
