# Helpdesk App
 
## Running the project
To run the project, go to the readmes in the backend and frontend directories and follow the instructions to run the full stack project.

## Endpoints
- TicketController/GetTickets(params: search, priority, status, sortBy, desc)
- TicketController/GetTicketById(fromrouter id)
- TicketController/Post(json body: description, title, priority)
- TicketController/Put(fromrouter: id, json body: description, title, priority)
- TicketController/Patch(fromrouter: id, json body: status)
- CommentController/GetByTicketId(fromrouter: id)
- CommentController/Post(json body: text)

## Test the endpoints
Load the Postman collection onto Postman to test the endpoints.
