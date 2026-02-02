import { Router } from 'express';
import { BookController } from '../controllers/book.controller';

/**
 * BookRoutes class - Defines all routes for Book-related operations
 * Implements the Router pattern for organizing API endpoints
 */
export class BookRoutes {
    public router: Router;
    private bookController: BookController;

    constructor() {
        this.router = Router();
        this.bookController = new BookController();
        this.initializeRoutes();
    }

    /**
     * Initializes all book-related routes
     * Follows RESTful API conventions
     */
    private initializeRoutes(): void {
        // Create a new book
        // POST /api/books
        this.router.post('/', this.bookController.createBook);

        // Get all books
        // GET /api/books
        this.router.get('/', this.bookController.getAllBooks);

        // Search books by title or author
        // GET /api/books/search?q=searchQuery
        this.router.get('/search', this.bookController.searchBooks);

        // Get books that are in stock
        // GET /api/books/stock/available
        this.router.get('/stock/available', this.bookController.getInStockBooks);

        // Get books by genre
        // GET /api/books/genre/:genre
        this.router.get('/genre/:genre', this.bookController.getBooksByGenre);

        // Get a single book by ID
        // GET /api/books/:id
        this.router.get('/:id', this.bookController.getBookById);

        // Update a book by ID
        // PUT /api/books/:id
        this.router.put('/:id', this.bookController.updateBook);

        // Delete a book by ID
        // DELETE /api/books/:id
        this.router.delete('/:id', this.bookController.deleteBook);
    }

    /**
     * Returns the configured router instance
     * @returns Express Router with all book routes
     */
    public getRouter(): Router {
        return this.router;
    }
}
