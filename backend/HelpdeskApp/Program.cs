using HelpdeskApp.Infrastructure;
using HelpdeskApp.Interfaces;
using HelpdeskApp.MappingHelper;
using HelpdeskApp.Models;
using HelpdeskApp.Repository;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFile));
});
builder.Services.AddAutoMapper(cfg =>
{
    // v15 requires a license key (a free Community edition key is available
    // from automapper.io). Without it, it still works but logs a warning.
    cfg.LicenseKey = builder.Configuration["AutoMapper:LicenseKey"];
}, typeof(Program).Assembly);
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<ITicketRepository, TicketRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(x => x
     .AllowAnyMethod()
     .AllowAnyHeader()
     .AllowCredentials()
      .SetIsOriginAllowed(origin => true));

app.UseAuthorization();

app.MapControllers();

app.Run();
