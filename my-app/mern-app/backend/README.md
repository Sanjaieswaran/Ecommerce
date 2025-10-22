# Backend Documentation

This is the backend part of the MERN stack application. It is built using Node.js, Express, and MongoDB.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Configuration

- Create a `.env` file in the `backend` directory to store your environment variables, such as your MongoDB connection string.

### Running the Application

To start the backend server, run:
```
npm start
```

The server will run on `http://localhost:5000` by default.

### API Endpoints

- **GET /api/items**: Retrieve all items.
- **POST /api/items**: Create a new item.
- **GET /api/items/:id**: Retrieve a specific item by ID.
- **PUT /api/items/:id**: Update a specific item by ID.
- **DELETE /api/items/:id**: Delete a specific item by ID.

### Testing

You can use tools like Postman or Insomnia to test the API endpoints.

### License

This project is licensed under the MIT License.