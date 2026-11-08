# Lab 3: REST API, Query Parameters, Validation, Debugging

## Student Details
- **Student Name: Sirisha Nagam
- **Roll Number: 252U1R5109
- **Section:** AI&DE-2B
- **Subject:** Backend Development Fundamentals
- **Module:** 3 – RESTful API Development and Validation

## Objective
To develop a REST API using Node.js, Express.js and SQLite. To implement CRUD operations, query parameters, searching, sorting, price filtering, input validation and proper HTTP status codes.

## Technologies Used
- Node.js
- Express.js
- SQLite
- Postman
- Visual Studio Code

## Project Structure
```text
lab3/
├── screenshots/
├── books.db
├── db.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Installation
Install the required dependencies:

```bash
npm install
```

## Run the Server
```bash
node server.js
```

**Server URL:** `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

## Query Parameters
- `search_q` – Search books by title.
- `order_by` – Sort records.
- `order` – ASC or DESC.
- `limit` – Limit the number of records.
- `offset` – Skip records.
- `min_price` – Minimum book price.
- `max_price` – Maximum book price.

## Postman Testing
Screenshots of API testing are stored in the `screenshots/` folder.

## Expected Output
The API performs CRUD operations and supports searching, sorting, filtering and input validation with appropriate HTTP status codes.

## Problems Faced and Solutions
- Server execution error: Corrected the server file path.
- Database connection: Verified the SQLite database connection.
- API testing: Used Postman Desktop to test API requests.

## GitHub Repository
Add your GitHub repository link here.