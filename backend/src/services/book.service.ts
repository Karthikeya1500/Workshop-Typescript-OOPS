import { BookModel, IBook } from '../schema/book.schema';

/**
 * Interface defining the contract for Book Service operations
 * Ensures all CRUD methods are implemented
 */
interface IBookService {
    createBook(bookData: Partial<IBook>): Promise<IBook>;
    getAllBooks(): Promise<IBook[]>;
    getBookById(id: string): Promise<IBook | null>;
    updateBook(id: string, bookData: Partial<IBook>): Promise<IBook | null>;
    deleteBook(id: string): Promise<IBook | null>;
    searchBooks(query: string): Promise<IBook[]>;
}

/**
 * BookService class - Handles all business logic for Book operations
 * Implements the Service Layer pattern for separation of concerns
 */
export class BookService implements IBookService {

    /**
     * Creates a new book in the database
     * @param bookData - Partial book object containing book details
     * @returns Promise resolving to the created book document
     * @throws Error if validation fails or duplicate ISBN exists
     */
    async createBook(bookData: Partial<IBook>): Promise<IBook> {
        try {
            const newBook = new BookModel(bookData);
            const savedBook = await newBook.save();
            return savedBook;
        } catch (error: any) {
            if (error.code === 11000) {
                throw new Error('A book with this ISBN already exists');
            }
            throw new Error(`Failed to create book: ${error.message}`);
        }
    }

    /**
     * Retrieves all books from the database
     * @returns Promise resolving to an array of all book documents
     */
    async getAllBooks(): Promise<IBook[]> {
        try {
            const books = await BookModel.find()
                .sort({ createdAt: -1 }) // Sort by newest first
                .exec();
            return books;
        } catch (error: any) {
            throw new Error(`Failed to fetch books: ${error.message}`);
        }
    }

    /**
     * Retrieves a single book by its ID
     * @param id - MongoDB ObjectId of the book
     * @returns Promise resolving to the book document or null if not found
     */
    async getBookById(id: string): Promise<IBook | null> {
        try {
            const book = await BookModel.findById(id).exec();
            return book;
        } catch (error: any) {
            throw new Error(`Failed to fetch book: ${error.message}`);
        }
    }

    /**
     * Updates an existing book with new data
     * @param id - MongoDB ObjectId of the book to update
     * @param bookData - Partial book object containing fields to update
     * @returns Promise resolving to the updated book document or null if not found
     */
    async updateBook(id: string, bookData: Partial<IBook>): Promise<IBook | null> {
        try {
            const updatedBook = await BookModel.findByIdAndUpdate(
                id,
                { $set: bookData },
                {
                    new: true, // Return the updated document
                    runValidators: true // Run schema validators on update
                }
            ).exec();
            return updatedBook;
        } catch (error: any) {
            if (error.code === 11000) {
                throw new Error('A book with this ISBN already exists');
            }
            throw new Error(`Failed to update book: ${error.message}`);
        }
    }

    /**
     * Deletes a book from the database
     * @param id - MongoDB ObjectId of the book to delete
     * @returns Promise resolving to the deleted book document or null if not found
     */
    async deleteBook(id: string): Promise<IBook | null> {
        try {
            const deletedBook = await BookModel.findByIdAndDelete(id).exec();
            return deletedBook;
        } catch (error: any) {
            throw new Error(`Failed to delete book: ${error.message}`);
        }
    }

    /**
     * Searches for books by title or author
     * @param query - Search string to match against title or author
     * @returns Promise resolving to an array of matching book documents
     */
    async searchBooks(query: string): Promise<IBook[]> {
        try {
            const books = await BookModel.find({
                $or: [
                    { title: { $regex: query, $options: 'i' } }, // Case-insensitive search
                    { author: { $regex: query, $options: 'i' } }
                ]
            })
                .sort({ createdAt: -1 })
                .exec();
            return books;
        } catch (error: any) {
            throw new Error(`Failed to search books: ${error.message}`);
        }
    }

    /**
     * Gets books by genre
     * @param genre - Genre to filter by
     * @returns Promise resolving to an array of books in the specified genre
     */
    async getBooksByGenre(genre: string): Promise<IBook[]> {
        try {
            const books = await BookModel.find({ genre })
                .sort({ createdAt: -1 })
                .exec();
            return books;
        } catch (error: any) {
            throw new Error(`Failed to fetch books by genre: ${error.message}`);
        }
    }

    /**
     * Gets books that are currently in stock
     * @returns Promise resolving to an array of in-stock books
     */
    async getInStockBooks(): Promise<IBook[]> {
        try {
            const books = await BookModel.find({ inStock: true })
                .sort({ createdAt: -1 })
                .exec();
            return books;
        } catch (error: any) {
            throw new Error(`Failed to fetch in-stock books: ${error.message}`);
        }
    }
}
