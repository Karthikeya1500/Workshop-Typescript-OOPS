# Book Store API - Backend

A full-fledged CRUD backend application built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** following **Object-Oriented Programming (OOP)** principles.

## 📋 Features

- ✅ Complete CRUD operations (Create, Read, Update, Delete)
- ✅ RESTful API design
- ✅ TypeScript for type safety
- ✅ MongoDB with Mongoose ODM
- ✅ Object-Oriented Programming architecture
- ✅ Proper error handling
- ✅ Input validation
- ✅ Search and filter functionality
- ✅ Clean code structure with separation of concerns

## 🏗️ Architecture

The application follows a **layered architecture** pattern:

```
src/
├── schema/          # Database models and schemas
├── services/        # Business logic layer
├── controllers/     # Request/Response handlers
├── routes/          # API route definitions
├── app.ts          # Application setup and configuration
└── server.ts       # Entry point
```

### Design Patterns Used:

1. **MVC Pattern** - Separation of concerns (Model-View-Controller)
2. **Service Layer Pattern** - Business logic isolation
3. **Repository Pattern** - Data access abstraction
4. **Dependency Injection** - Loose coupling between components

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your MongoDB connection string:
   ```env
   PORT=4000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/bookstore
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:4000`

## 📚 API Endpoints

### Base URL
```
http://localhost:4000/api
```

### Health Check
```http
GET /health
```

### Books Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/books` | Create a new book |
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get a single book by ID |
| PUT | `/api/books/:id` | Update a book by ID |
| DELETE | `/api/books/:id` | Delete a book by ID |
| GET | `/api/books/search?q=query` | Search books by title or author |
| GET | `/api/books/genre/:genre` | Get books by genre |
| GET | `/api/books/stock/available` | Get in-stock books |

### Example Requests

#### Create a Book
```bash
curl -X POST http://localhost:4000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "9780743273565",
    "publishedYear": 1925,
    "genre": "Fiction",
    "price": 15.99,
    "inStock": true
  }'
```

#### Get All Books
```bash
curl http://localhost:4000/api/books
```

#### Get Book by ID
```bash
curl http://localhost:4000/api/books/507f1f77bcf86cd799439011
```

#### Update a Book
```bash
curl -X PUT http://localhost:4000/api/books/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 19.99,
    "inStock": false
  }'
```

#### Delete a Book
```bash
curl -X DELETE http://localhost:4000/api/books/507f1f77bcf86cd799439011
```

#### Search Books
```bash
curl http://localhost:4000/api/books/search?q=Gatsby
```

## 📦 Data Model

### Book Schema

```typescript
{
  title: string;          // Required, 1-200 characters
  author: string;         // Required, min 2 characters
  isbn: string;           // Required, unique, ISBN-10 or ISBN-13
  publishedYear: number;  // Required, 1000 to current year
  genre: string;          // Required, enum values
  price: number;          // Required, >= 0
  inStock: boolean;       // Default: true
  createdAt: Date;        // Auto-generated
  updatedAt: Date;        // Auto-generated
}
```

### Valid Genres
- Fiction
- Non-Fiction
- Science
- Technology
- Biography
- History
- Fantasy
- Mystery
- Romance
- Thriller
- Other

## 🧪 Testing with Postman

1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:4000`
3. Test each endpoint with sample data

## 🛠️ Available Scripts

```bash
# Development mode with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── schema/
│   │   ├── book.schema.ts       # Book model definition
│   │   └── todo.schema.ts       # Todo model (example)
│   ├── services/
│   │   ├── book.service.ts      # Book business logic
│   │   └── todo.service.ts      # Todo service (example)
│   ├── controllers/
│   │   ├── book.controller.ts   # Book request handlers
│   │   └── todo.controller.ts   # Todo controller (example)
│   ├── routes/
│   │   └── book.routes.ts       # Book route definitions
│   ├── app.ts                   # Express app configuration
│   └── server.ts                # Application entry point
├── .env.example                 # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 OOP Principles Applied

### 1. **Encapsulation**
- Data and methods are encapsulated within classes
- Private members are used to hide implementation details

### 2. **Abstraction**
- Interfaces define contracts for classes
- Service layer abstracts business logic from controllers

### 3. **Inheritance**
- Mongoose Document interface extends base functionality
- Classes implement interfaces for type safety

### 4. **Separation of Concerns**
- Schema: Data structure and validation
- Service: Business logic
- Controller: HTTP request/response handling
- Routes: Endpoint definitions

## 🔒 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## 🌟 Best Practices Implemented

1. ✅ TypeScript for type safety
2. ✅ Async/await for asynchronous operations
3. ✅ Proper error handling with try-catch
4. ✅ Input validation at multiple levels
5. ✅ Consistent API response structure
6. ✅ Environment variables for configuration
7. ✅ Clean code with meaningful names
8. ✅ Comprehensive comments and documentation
9. ✅ RESTful API conventions
10. ✅ Database indexing for performance

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ following industry best practices and clean code principles.
