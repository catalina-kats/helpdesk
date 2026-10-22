using HelpdeskApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HelpdeskApp.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {

        }

        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //builder.Entity<Ticket>(x => x.HasKey(p => new { p.Comments }));

            builder.Entity<Comment>()
                .HasOne(u => u.Ticket)
                .WithMany(u => u.Comments)
                .HasForeignKey(p => p.TicketId);

        }
    }
}
