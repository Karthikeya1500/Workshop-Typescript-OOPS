# Project Architecture Overview

## 📐 Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│              (Postman, Browser, Mobile App)                  │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      ROUTES LAYER                            │
│                    (book.routes.ts)                          │
│  • Defines API endpoints                                     │
│  • Maps URLs to controller methods                           │
│  • RESTful route organization                                │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   CONTROLLER LAYER                           │
│                  (book.controller.ts)                        │
│  • Handles HTTP requests/responses                           │
│  • Validates request data                                    │
│  • Calls service layer methods                               │
│  • Formats API responses                                     │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVICE LAYER                             │
│                   (book.service.ts)                          │
│  • Contains business logic                                   │
│  • Performs data operations                                  │
│  • Handles error scenarios                                   │
│  • Implements CRUD operations                                │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     SCHEMA LAYER                             │
│                   (book.schema.ts)                           │
│  • Defines data models                                       │
│  • Schema validation rules                                   │
│  • Database indexes                                          │
│  • TypeScript interfaces                                     │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                            │
│                   (MongoDB/Mongoose)                         │
│  • Data persistence                                          │
│  • Query execution                                           │
│  • Transaction management                                    │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow

```
1. Client Request
   ↓
2. Express Middleware (CORS, JSON parsing, logging)
   ↓
3. Route Handler (matches URL pattern)
   ↓
4. Controller Method (validates input)
   ↓
5. Service Method (executes business logic)
   ↓
6. Database Operation (Mongoose/MongoDB)
   ↓
7. Service Returns Data
   ↓
8. Controller Formats Response
   ↓
9. Client Receives Response
```

## 🎯 OOP Principles Implementation

### 1. Encapsulation
```typescript
class BookService {
    // Private methods and data are hidden
    private validateBookData() { }
    
    // Public interface is exposed
    public async createBook() { }
}
```

### 2. Abstraction
```typescript
interface IBookService {
    createBook(): Promise<IBook>;
    getAllBooks(): Promise<IBook[]>;
    // ... abstract methods
}

class BookService implements IBookService {
    // Implementation details hidden
}
```

### 3. Single Responsibility Principle
- **Schema**: Data structure only
- **Service**: Business logic only
- **Controller**: HTTP handling only
- **Routes**: Routing only

### 4. Dependency Injection
```typescript
class BookController {
    private bookService: BookService;
    
    constructor() {
        this.bookService = new BookService();
    }
}
```

## 📊 Class Diagram

```
┌─────────────────────────┐
│      IBook              │
│    (Interface)          │
├─────────────────────────┤
│ + title: string         │
│ + author: string        │
│ + isbn: string          │
│ + publishedYear: number │
│ + genre: string         │
│ + price: number         │
│ + inStock: boolean      │
└─────────────────────────┘
           △
           │ implements
           │
┌─────────────────────────┐
│     BookModel           │
│   (Mongoose Model)      │
├─────────────────────────┤
│ + find()                │
│ + findById()            │
│ + save()                │
│ + update()              │
│ + delete()              │
└─────────────────────────┘
           △
           │ uses
           │
┌─────────────────────────┐
│    BookService          │
├─────────────────────────┤
│ + createBook()          │
│ + getAllBooks()         │
│ + getBookById()         │
│ + updateBook()          │
│ + deleteBook()          │
│ + searchBooks()         │
└─────────────────────────┘
           △
           │ uses
           │
┌─────────────────────────┐
│   BookController        │
├─────────────────────────┤
│ - bookService           │
├─────────────────────────┤
│ + createBook()          │
│ + getAllBooks()         │
│ + getBookById()         │
│ + updateBook()          │
│ + deleteBook()          │
│ + searchBooks()         │
└─────────────────────────┘
           △
           │ uses
           │
┌─────────────────────────┐
│     BookRoutes          │
├─────────────────────────┤
│ - router                │
│ - bookController        │
├─────────────────────────┤
│ + initializeRoutes()    │
│ + getRouter()           │
└─────────────────────────┘
```

## 🗂️ File Structure

```
backend/
│
├── src/
│   │
│   ├── schema/
│   │   └── book.schema.ts
│   │       • Defines IBook interface
│   │       • Creates Mongoose schema
│   │       • Exports BookModel
│   │       • Validation rules
│   │
│   ├── services/
│   │   └── book.service.ts
│   │       • IBookService interface
│   │       • BookService class
│   │       • CRUD operations
│   │       • Business logic
│   │
│   ├── controllers/
│   │   └── book.controller.ts
│   │       • IBookController interface
│   │       • BookController class
│   │       • HTTP handlers
│   │       • Response formatting
│   │
│   ├── routes/
│   │   └── book.routes.ts
│   │       • BookRoutes class
│   │       • Route definitions
│   │       • Endpoint mapping
│   │
│   ├── app.ts
│   │   • App class
│   │   • Middleware setup
│   │   • Route registration
│   │   • Database connection
│   │
│   └── server.ts
│       • Application entry point
│       • Creates App instance
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
└── API_TESTING.md
```

## 🔐 Security Features

1. **Input Validation**
   - Schema-level validation
   - Controller-level validation
   - Type checking with TypeScript

2. **Error Handling**
   - Try-catch blocks
   - Consistent error responses
   - No sensitive data exposure

3. **CORS Configuration**
   - Configurable origins
   - Method restrictions
   - Header controls

## 🚀 Performance Optimizations

1. **Database Indexing**
   - Indexed fields: title, author, isbn
   - Faster query performance

2. **Async/Await**
   - Non-blocking operations
   - Better resource utilization

3. **Connection Pooling**
   - Mongoose default pooling
   - Efficient database connections

## 📈 Scalability Considerations

1. **Modular Architecture**
   - Easy to add new features
   - Independent layers

2. **Service Layer Pattern**
   - Reusable business logic
   - Can be called from multiple controllers

3. **TypeScript**
   - Type safety
   - Better refactoring support
   - IDE autocomplete

## 🧪 Testing Strategy

1. **Unit Tests** (Future)
   - Test service methods
   - Test controller logic
   - Mock database calls

2. **Integration Tests** (Future)
   - Test API endpoints
   - Test database operations
   - Test error scenarios

3. **Manual Testing**
   - Use provided curl commands
   - Test with Postman
   - Validate all CRUD operations
