# Backend decisions

-   Controllers are divided by entities, in this case Ticket and Comment, so they're better organised
-   One to many relationship between ticket and comments: Comment only makes sense in the context of a ticket.
-   Separate PATCH /status endpoint: status changes follow a business rule (a ticket can only advance to the next status), so they’re isolated from the general PUT update and the rule can be enforced in one place.
-   DTOs instead of exposing entities: clients can’t set fields like CreatedAt or the ID, and the database model can change without breaking the whole thing.
-   Server-side pagination and filtering with IQueryable: filters, sorting, and paging run in the database, so only the requested page is fetched. Page size is capped to protect performance.
-   CancellationToken in async endpoints: abandoned requests stop their database work instead of wasting resources.
-   Swagger with endpoint summaries: for the future devs checking this project, and not feel like they're reading chinese.