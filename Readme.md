# Project Title

Zania Full Stack Coding Challenge

## Installation and Setup Instructions

Clone down this repository. You will need `git` installed on your machine.

```bash
git clone https://github.com/mondalraj/zania-fullstack-challenge.git
```

Running the project:
Go to the project directory

```bash
cd zania-fullstack-challenge
```

Running the project with docker: You need to have `docker` installed on your machine

```bash
docker compose up
```

Finally, open your browser and go to `http://localhost:3000/`

Running the project without docker: You need to have nodejs and npm installed on your machine

```bash
cd frontend
npm install
npm start
```

Finally, open your browser and go to `http://localhost:3000/`

## Task 1

- [x] Displayed a list of documents with thumbnails (cat images) using flexbox.
- [x] Used Next.js lazy loading for all images.
- [x] Implemented card reordering using `react-beautiful-dnd` library. Applied custom logic to arrange the cards in the order of drag.
- [x] Images open in a modal on click, with the modal closing on outside click or Enter keypress.

## Task 2

Initially, I developed the API using Python, Starlette and SQLAlchemy. When I was implementing the API, it was going good, but when I connected the API with PostgreSQL database, it started giving me error, I tried to debug it, and I found out there was version mismatching between databases and sqlalchemy package. I tried to fix it, but it took more time than expected. So, I decided to implement this task from the frontend side only using Next.js API route handler.

The incomplete Python code is in the backend directory.

Implemented API endpoints with Next.js:

- [x] GET `/api/docs` - Retrieve all documents (data persistence via cookies)
- [x] POST `/api/docs` - To add a new document
- [x] PATCH `/api/docs` - To reorder the documents
- [x] DELETE `/api/docs` - To delete a document, I used `id` to delete the document using searchParams

API code is located in the `frontend/src/app/api/docs` directory.

## Task 3

- [x] Fetched documents and rendered them in a grid view using `react-tanstack-query` library. It's a very powerful library to fetch data from the API and manage the state of the data (cache, stale, invalidate queries, refetching, and other cool flexibilities) instead of using useEffect which has it's own limitations.
- [x] Saved document order every 5 seconds if changed, using a useInterval custom hook.
- [x] Displayed a loading spinner during data fetch or update. You will barely see it since the API is very fast.
- [x] Displayed the last updated time of the documents. I used `date-fns` package to display the time in a human-readable format.

## Task 4

- [x] Created a `Dockerfile` in the `/frontend` directory and a `docker-compose.yml` file in the project root to run the project in a Docker container. Use docker compose up to run.

## Task 5

- [x] Deployed the project on Vercel. You can check the live project [here](https://zania-fullstack-challenge.vercel.app/)
- [x] All API endpoints for adding, updating, and deleting documents are functional, except the `update document` which is functional as an API but not integrated in frontend.
