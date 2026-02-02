import { Request, Response } from 'express';
import { BookService } from '../services/book.service';

/**
 * Interface defining the contract for Book Controller methods
 * Ensures all HTTP handlers are properly typed
 */
interface IBookController {
    createBook(req: Request, res: Response): Promise<void>;
    getAllBooks(req: Request, res: Response): Promise<void>;
    getBookById(req: Request, res: Response): Promise<void>;
    updateBook(req: Request, res: Response): Promise<void>;
    deleteBook(req: Request, res: Response): Promise<void>;
    searchBooks(req: Request, res: Response): Promise<void>;
}

/**
 * BookController class - Handles HTTP requests and responses for Book operations
 * Implements the Controller Layer pattern for handling API endpoints
 */
export class BookController implements IBookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    /**
     * POST /api/books - Creates a new book
     * @param req - Express request object containing book data in body
     * @param res - Express response object
     */
    createBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const bookData = req.body;

            // Validate required fields
            if (!bookData.title || !bookData.author || !bookData.isbn) {
                res.status(400).json({
                    success: false,
                    message: 'Missing required fields: title, author, and isbn are required'
                });
                return;
            }

            const newBook = await this.bookService.createBook(bookData);

            res.status(201).json({
                success: true,
                message: 'Book created successfully',
                data: newBook
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Failed to create book',
                error: error.message
            });
        }
    };

    /**
     * GET /api/books - Retrieves all books
     * @param req - Express request object
     * @param res - Express response object
     */
    getAllBooks = async (req: Request, res: Response): Promise<void> => {
        try {
            const books = await this.bookService.getAllBooks();

            res.status(200).json({
                success: true,
                message: 'Books retrieved successfully',
                count: books.length,
                data: books
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve books',
                error: error.message
            });
        }
    };

    /**
     * GET /api/books/:id - Retrieves a single book by ID
     * @param req - Express request object containing book ID in params
     * @param res - Express response object
     */
    getBookById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Book ID is required'
                });
                return;
            }

            const book = await this.bookService.getBookById(id);

            if (!book) {
                res.status(404).json({
                    success: false,
                    message: 'Book not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Book retrieved successfully',
                data: book
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve book',
                error: error.message
            });
        }
    };

    /**
     * PUT /api/books/:id - Updates an existing book
     * @param req - Express request object containing book ID in params and update data in body
     * @param res - Express response object
     */
    updateBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            if (!id || typeof id !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Book ID is required'
                });
                return;
            }

            // Prevent updating certain fields
            delete updateData._id;
            delete updateData.createdAt;
            delete updateData.updatedAt;

            const updatedBook = await this.bookService.updateBook(id, updateData);

            if (!updatedBook) {
                res.status(404).json({
                    success: false,
                    message: 'Book not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Book updated successfully',
                data: updatedBook
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Failed to update book',
                error: error.message
            });
        }
    };

    /**
     * DELETE /api/books/:id - Deletes a book
     * @param req - Express request object containing book ID in params
     * @param res - Express response object
     */
    deleteBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Book ID is required'
                });
                return;
            }

            const deletedBook = await this.bookService.deleteBook(id);

            if (!deletedBook) {
                res.status(404).json({
                    success: false,
                    message: 'Book not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Book deleted successfully',
                data: deletedBook
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete book',
                error: error.message
            });
        }
    };

    /**
     * GET /api/books/search?q=query - Searches for books by title or author
     * @param req - Express request object containing search query in query params
     * @param res - Express response object
     */
    searchBooks = async (req: Request, res: Response): Promise<void> => {
        try {
            const { q } = req.query;

            if (!q || typeof q !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Search query is required'
                });
                return;
            }

            const books = await this.bookService.searchBooks(q);

            res.status(200).json({
                success: true,
                message: 'Search completed successfully',
                count: books.length,
                data: books
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Failed to search books',
                error: error.message
            });
        }
    };

    /**
     * GET /api/books/genre/:genre - Gets books by genre
     * @param req - Express request object containing genre in params
     * @param res - Express response object
     */
    getBooksByGenre = async (req: Request, res: Response): Promise<void> => {
        try {
            const { genre } = req.params;

            if (!genre || typeof genre !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Genre is required'
                });
                return;
            }

            const books = await this.bookService.getBooksByGenre(genre);

            res.status(200).json({
                success: true,
                message: 'Books retrieved successfully',
                count: books.length,
                data: books
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve books by genre',
                error: error.message
            });
        }
    };

    /**
     * GET /api/books/stock/available - Gets all in-stock books
     * @param req - Express request object
     * @param res - Express response object
     */
    getInStockBooks = async (req: Request, res: Response): Promise<void> => {
        try {
            const books = await this.bookService.getInStockBooks();

            res.status(200).json({
                success: true,
                message: 'In-stock books retrieved successfully',
                count: books.length,
                data: books
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve in-stock books',
                error: error.message
            });
        }
    };
}
