# HelpdeskApp

A helpdesk ticketing system frontend. Users create tickets, discuss them through comments, and move them through a simple status workflow.

  
## Features

- Create, view, update, and filter tickets

- Paginated ticket list with filtering and sorting

- Create and fetch comments based on ticket id

- API documentation with Swagger


## Stack used

- React

- Vite

- Axios

- Ant.Design


## Architecture

- /api/: Basically the HTTP client of the front end
- /assets/: any static resourced that would be needed like logos and images
- /components/: any reusable components that are needed throughout the project
- /features/: contain the major wrappers for the pages
- /utils/: contains reusable methods needed throughout the project


## Getting started
  

### Prerequisites
  
- Last version of Node
  

### Run project

In the root of the project, open a command line window and run the following commands:

```
npm install
npm run dev
```

The site runs at http://localhost:5173/

## What to improve
- Implement routing
- Implement auth service w/JWT, session token and the likes
- Theming
- Support for multiple languages
- Maybe cleaner state handling