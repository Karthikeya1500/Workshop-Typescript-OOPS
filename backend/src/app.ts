import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { BookRoutes } from './routes/book.routes';

// Load environment variables
dotenv.config();

/**
 * Interface defining the contract for the App class
 * Ensures all essential methods are implemented
 */
interface IApp {
    startServer(): void;
    connectDatabase(): Promise<void>;
    initializeMiddleware(): void;
    initializeRoutes(): void;
    initializeErrorHandling(): void;
}

/**
 * Main Application class - Entry point for the backend server
 * Implements OOP principles with proper separation of concerns
 */
export default class App implements IApp {
    public PORT: number | string;
    public app: express.Application;
    private mongoUri: string;

    constructor() {
        this.PORT = process.env.PORT || 4000;
        this.mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore';
        this.app = express();

        // Initialize application components in proper order
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorHandling();
        this.connectDatabase();
        this.startServer();
    }

    /**
     * Initializes Express middleware
     * Sets up JSON parsing, CORS, and other essential middleware
     */
    initializeMiddleware(): void {
        // Parse JSON request bodies
        this.app.use(express.json());

        // Parse URL-encoded request bodies
        this.app.use(express.urlencoded({ extended: true }));

        // Simple CORS middleware (for development)
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

            // Handle preflight requests
            if (req.method === 'OPTIONS') {
                res.sendStatus(200);
                return;
            }
            next();
        });

        // Request logging middleware
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
            next();
        });
    }

    /**
     * Initializes all application routes
     * Registers route handlers for different API endpoints
     */
    initializeRoutes(): void {
        // Health check endpoint
        this.app.get('/health', (req: Request, res: Response) => {
            res.status(200).json({
                success: true,
                message: 'Server is running',
                timestamp: new Date().toISOString()
            });
        });

        // API welcome endpoint
        this.app.get('/api', (req: Request, res: Response) => {
            res.status(200).json({
                success: true,
                message: 'Welcome to the Book Store API',
                version: '1.0.0',
                endpoints: {
                    books: '/api/books',
                    health: '/health'
                }
            });
        });

        // Register book routes
        const bookRoutes = new BookRoutes();
        this.app.use('/api/books', bookRoutes.getRouter());

        // 404 handler for undefined routes
        this.app.use((req: Request, res: Response) => {
            res.status(404).json({
                success: false,
                message: 'Route not found',
                path: req.path
            });
        });
    }

    /**
     * Initializes global error handling middleware
     * Catches and handles any unhandled errors
     */
    initializeErrorHandling(): void {
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error('Error:', err.message);
            console.error('Stack:', err.stack);

            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
            });
        });
    }

    /**
     * Connects to MongoDB database
     * Handles connection errors and success
     */
    async connectDatabase(): Promise<void> {
        try {
            await mongoose.connect(this.mongoUri);
            console.log('✅ Database Connected Successfully');
            console.log(`📊 Database: ${mongoose.connection.name}`);
        } catch (err: any) {
            console.error('❌ Database Connection Failed:', err.message);
            console.error('Please check your MongoDB connection string');
            // Don't exit the process, allow server to run without DB for debugging
        }

        // Handle database connection events
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  Database Disconnected');
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ Database Error:', err);
        });
    }

    /**
     * Starts the Express server
     * Listens on the configured port
     */
    startServer(): void {
        this.app.listen(this.PORT, () => {
            console.log('=================================');
            console.log(`🚀 Server is running`);
            console.log(`📡 Port: ${this.PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 API Base URL: http://localhost:${this.PORT}/api`);
            console.log('=================================');
        });
    }
}

