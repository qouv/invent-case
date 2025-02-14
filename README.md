# invent-case

## Library Management System

## Description
This is a RESTful API for managing a library system, allowing users to borrow and return books, as well as track their reading history. The API provides features such as listing users and books, accessing detailed information about them, and ensuring proper validation and error handling.

## Tech Stack
- **Node.js**: JavaScript runtime for backend development.
- **TypeScript**: Strongly typed JavaScript for better development experience.
- **Express.js**: Web framework for handling API requests.
- **Drizzle ORM**: Lightweight TypeScript ORM for database interactions.
- **PostgreSQL**: Relational database management system.
- **Zod**: Validation library for API request validation.
- **Lodash**: Utility library for object operations.

## Project Structure
```
- drizzle/
  - Contains migration files
- src/
  - db/
    - Table schemas
  - middlewares/
    - Middleware functions
  - routes/
    - Controllers and routes
  - types/
    - TypeScript types
```

## Features
- **User Management**
  - List all users
  - Get details of a user (name, borrowed books, past borrowed books with ratings)
  - Create a new user
- **Book Management**
  - List all books
  - Get book details (name, average rating)
  - Create a new book
- **Borrowing & Returning Books**
  - Borrow a book
  - Return a book with a rating

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/qouv/invent-case.git
   ```

2. Install dependencies:
   ```sh
   npm install or yarn install
   ```

3. Set up the database:
   - Ensure you have PostgreSQL installed and running.
   - Create a new database and update the `.env` file with your database credentials:
     ```sh
     DATABASE_URL=your_postgres_connection_url
     ```
   - Run migrations using Drizzle ORM:
     ```sh
     yarn db:migrate
     ```

4. Start the application:
   ```sh
   yarn dev
   ```

## Available Scripts

- `yarn dev` - Start the application in development mode
- `yarn build` - Compile TypeScript files
- `yarn db:generate` - Generate database schema files
- `yarn db:migrate` - Run database migrations
- `yarn db:studio` - Open Drizzle Studio for database management
- `yarn test` - Placeholder for tests

## API Endpoints
The API follows the structure defined in the provided Postman collection. Below are the key endpoints:


### Users

- `GET /users` - List all users
- `GET /users/:id` - Get a user's details
- `POST /users` - Create a new user

### Books

- `GET /books` - List all books
- `GET /books/:id` - Get book details
- `POST /books` - Add a new book

### Borrowing & Returning

- `POST /users/:userId/borrow/:bookId` - Borrow a book
- `POST /users/:userId/return/:bookId` - Return a book with a rating

## Validation & Error Handling

- **Zod** is used to validate API request payloads.
- Errors such as borrowing an already borrowed book or attempting actions with a non-existing user are properly handled with descriptive messages.
- The API returns appropriate HTTP status codes (e.g., 400 for validation errors, 500 for internal server errors).


## Author
Kaan Aslan - [GitHub](https://github.com/qouv)

