# Book Store API - Testing Guide

## Quick Test Commands

### 1. Health Check
```bash
curl http://localhost:4000/health
```

### 2. API Welcome
```bash
curl http://localhost:4000/api
```

## Book CRUD Operations

### Create Books (POST)

#### Book 1 - Fiction
```bash
curl -X POST http://localhost:4000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "isbn": "9780061120084",
    "publishedYear": 1960,
    "genre": "Fiction",
    "price": 18.99,
    "inStock": true
  }'
```

#### Book 2 - Technology
```bash
curl -X POST http://localhost:4000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "9780132350884",
    "publishedYear": 2008,
    "genre": "Technology",
    "price": 42.99,
    "inStock": true
  }'
```

#### Book 3 - Science
```bash
curl -X POST http://localhost:4000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "A Brief History of Time",
    "author": "Stephen Hawking",
    "isbn": "9780553380163",
    "publishedYear": 1988,
    "genre": "Science",
    "price": 16.99,
    "inStock": false
  }'
```

#### Book 4 - Fantasy
```bash
curl -X POST http://localhost:4000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "isbn": "9780547928227",
    "publishedYear": 1937,
    "genre": "Fantasy",
    "price": 14.99,
    "inStock": true
  }'
```

### Get All Books (GET)
```bash
curl http://localhost:4000/api/books
```

### Get Single Book (GET)
Replace `BOOK_ID` with actual MongoDB ObjectId from created book:
```bash
curl http://localhost:4000/api/books/BOOK_ID
```

### Update Book (PUT)
Replace `BOOK_ID` with actual MongoDB ObjectId:
```bash
curl -X PUT http://localhost:4000/api/books/BOOK_ID \
  -H "Content-Type: application/json" \
  -d '{
    "price": 24.99,
    "inStock": true
  }'
```

### Delete Book (DELETE)
Replace `BOOK_ID` with actual MongoDB ObjectId:
```bash
curl -X DELETE http://localhost:4000/api/books/BOOK_ID
```

## Search and Filter Operations

### Search by Title or Author
```bash
# Search for "Hobbit"
curl "http://localhost:4000/api/books/search?q=Hobbit"

# Search for "Martin"
curl "http://localhost:4000/api/books/search?q=Martin"

# Search for "Time"
curl "http://localhost:4000/api/books/search?q=Time"
```

### Get Books by Genre
```bash
# Get Fiction books
curl http://localhost:4000/api/books/genre/Fiction

# Get Technology books
curl http://localhost:4000/api/books/genre/Technology

# Get Science books
curl http://localhost:4000/api/books/genre/Science

# Get Fantasy books
curl http://localhost:4000/api/books/genre/Fantasy
```

### Get In-Stock Books
```bash
curl http://localhost:4000/api/books/stock/available
```

## Expected Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* book object or array */ },
  "count": 1  // Only for list operations
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Testing Validation

### Test Missing Required Fields
```bash
curl -X POST http://localhost:4000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book"
  }'
```
Expected: 400 Bad Request - Missing required fields

### Test Invalid ISBN
```bash
curl -X POST http://localhost:4000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book",
    "author": "Test Author",
    "isbn": "invalid-isbn",
    "publishedYear": 2020,
    "genre": "Fiction",
    "price": 10.99
  }'
```
Expected: 400 Bad Request - Invalid ISBN format

### Test Invalid Genre
```bash
curl -X POST http://localhost:4000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book",
    "author": "Test Author",
    "isbn": "9780000000000",
    "publishedYear": 2020,
    "genre": "InvalidGenre",
    "price": 10.99
  }'
```
Expected: 400 Bad Request - Invalid genre

### Test Duplicate ISBN
First create a book, then try to create another with the same ISBN:
```bash
# Create first book
curl -X POST http://localhost:4000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book 1",
    "author": "Test Author",
    "isbn": "9781234567890",
    "publishedYear": 2020,
    "genre": "Fiction",
    "price": 10.99
  }'

# Try to create duplicate
curl -X POST http://localhost:4000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book 2",
    "author": "Another Author",
    "isbn": "9781234567890",
    "publishedYear": 2021,
    "genre": "Fiction",
    "price": 15.99
  }'
```
Expected: 400 Bad Request - Duplicate ISBN

## Using with Postman

1. Open Postman
2. Create a new collection called "Book Store API"
3. Add requests for each endpoint above
4. Set the base URL to `http://localhost:4000`
5. For POST/PUT requests, set Content-Type header to `application/json`
6. Save book IDs from responses to test GET/PUT/DELETE operations

## Using with VS Code Thunder Client

1. Install Thunder Client extension
2. Create a new collection
3. Import the curl commands above
4. Test each endpoint

## Notes

- Make sure MongoDB is running before testing
- Replace `BOOK_ID` placeholders with actual ObjectIds from your database
- All timestamps (createdAt, updatedAt) are automatically managed by MongoDB
- Search is case-insensitive
- ISBN must be 10 or 13 digits (hyphens are allowed but removed during validation)
