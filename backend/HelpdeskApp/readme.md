
# HelpdeskApp

  

A helpdesk ticketing system backend. Users create tickets, discuss them through comments, and move them through a simple status workflow.

  

## Features

  

- Create, view, update, and filter tickets

- Paginated ticket list with filtering and sorting

- Create and fetch comments based on ticket id

- API documentation with Swagger

  

## Stack used

- .NET 8 (ASP.NET Core Web API)

- Entity Framework Core

- Swagger / Swashbuckle

- Automapper

  
  

## Getting started

  

### Prerequisites

  

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

- Local database in SQL Server, like Express

  

### Run project

  

Edit appsettings.json to match local database. Then run the following commands inside the helpdesk project (not the solution folder):
```
dotnet ef migrations add init

dotnet ef database update
```
  
  

# Run the API
To run the API:
```
dotnet run
```

  

The API runs at `https://localhost:7295` and Swagger UI is available at https://localhost:7295/swagger/index.html

  

