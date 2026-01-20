// server/index.js

// 1. IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// 2. CONFIGURATION
const app = express();
const PORT = 5000;

// Middleware (Allows the frontend to talk to this backend)
app.use(cors());
app.use(bodyParser.json());

// 3. DATABASE CONNECTION
const dbURI = 'mongodb+srv://abhishek200228_db_user:qQBFLRu3sywBUlgS@cluster0.ljj6rbz.mongodb.net/?appName=Cluster0';

mongoose.connect(dbURI)
.then(() => console.log("--- MongoDB Cloud Connected ---"))
.catch(err => console.log("DB Connection Error:", err));

// 4. DATABASE SCHEMAS (Models)

// Book Schema
const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    price: Number,
    imageUrl: String,
    isAvailable: { type: Boolean, default: true } // Crucial for Requirement (e)
});

const Book = require('./models/Book');

// Order Schema
const OrderSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    totalPrice: Number,
    cartItems: [ // Array of book objects
        {
            bookId: String,
            title: String,
            price: Number
        }
    ],
    orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);

// 5. API ROUTES

// A. SEED ROUTE (Run this once to fill your store)
app.get('/api/seed', async (req, res) => {
    // 1. Clear database
    await Book.deleteMany({});
    
    const sampleBooks = [
        // --- 1. Wings of Fire ---
        { 
            title: "Wings of Fire", 
            author: "A.P.J. Abdul Kalam", 
            description: "This is the inspiring autobiography of Dr. A.P.J. Abdul Kalam, the former President of India and a visionary scientist. The book narrates his humble beginnings in Rameswaram, his struggles as a student, and his journey to becoming a key player in Indian space research and missile programs. It is not just a personal story but a blueprint for the youth of India, urging them to dream big and work hard.", 
            price: 399, 
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/3a/Wings_of_Fire_by_A_P_J_Abdul_Kalam_Book_Cover.jpg", 
            isAvailable: true,
            category: "Autobiography",
            pages: 180,
            rating: 4.9
        },

        // --- 2. 1984 ---
        { 
            title: "1984", 
            author: "George Orwell", 
            description: "George Orwell's dystopian masterpiece depicts a chilling future where the government, known as 'The Party', watches your every move. Big Brother is always watching. The protagonist, Winston Smith, wrestles with oppression in Oceania, a place where the Thought Police scrutinize human individuality and independent thinking is a crime.", 
            price: 250, 
            imageUrl: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg", 
            isAvailable: true,
            category: "Sci-Fi / Classic",
            pages: 328,
            rating: 4.7
        },

        // --- 3. The Great Gatsby ---
        { 
            title: "The Great Gatsby", 
            author: "F. Scott Fitzgerald", 
            description: "Set in the Roaring Twenties, this novel explores the life of the mysterious millionaire Jay Gatsby and his obsession with the beautiful debutante Daisy Buchanan. It paints a vivid picture of excess, jazz, and parties on Long Island, while digging deep into themes of decadence, idealism, resistance to change, and social upheaval.", 
            price: 300, 
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg", 
            isAvailable: true,
            category: "Classic Fiction",
            pages: 218,
            rating: 4.4
        },

        // --- 4. The Alchemist ---
        { 
            title: "The Alchemist", 
            author: "Paulo Coelho", 
            description: "A magical story about Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest leads him to riches far different—and far more satisfying—than he ever imagined. Santiago's journey teaches us about the essential wisdom of listening to our hearts and following our dreams.", 
            price: 299, 
            imageUrl: "https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg", 
            isAvailable: true,
            category: "Fiction / Philosophy",
            pages: 163,
            rating: 4.8
        },

        // --- 5. Atomic Habits ---
        { 
            title: "Atomic Habits", 
            author: "James Clear", 
            description: "Atomic Habits provides a practical and proven framework for creating good habits and breaking bad ones. Drawing on biology, psychology, and neuroscience, James Clear explains how tiny changes can grow into life-altering outcomes. Whether you want to lose weight, write a book, or simply get better at life, this book provides the tools you need.", 
            price: 499, 
            imageUrl: "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg", 
            isAvailable: true,
            category: "Self-Help",
            pages: 320,
            rating: 4.9
        },

        // --- 6. Harry Potter & The Philosopher's Stone ---
        { 
            title: "Harry Potter & The Philosopher's Stone", 
            author: "J.K. Rowling", 
            description: "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry.", 
            price: 650, 
            imageUrl: "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg", 
            isAvailable: true,
            category: "Fantasy",
            pages: 309,
            rating: 4.9
        },

        // --- 7. Rich Dad Poor Dad ---
        { 
            title: "Rich Dad Poor Dad", 
            author: "Robert Kiyosaki", 
            description: "Rich Dad Poor Dad is Robert's story of growing up with two dads — his real father and the father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing. The book explodes the myth that you need to earn a high income to be rich and explains the difference between working for money and having your money work for you.", 
            price: 350, 
            imageUrl: "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg", 
            isAvailable: true,
            category: "Finance",
            pages: 336,
            rating: 4.6
        },

        // --- 8. Ikigai ---
        { 
            title: "Ikigai", 
            author: "Hector Garcia", 
            description: "The people of Japan believe that everyone has an ikigai – a reason to jump out of bed each morning. Inspiring and comforting, this book will give you the life-changing tools to uncover your personal ikigai. It brings the focus to the intersection of passion, mission, vocation, and profession, helping you find balance and joy in everyday life.", 
            price: 400, 
            imageUrl: "https://m.media-amazon.com/images/I/81l3rZK4lnL._AC_UF1000,1000_QL80_.jpg", 
            isAvailable: true,
            category: "Wellness",
            pages: 208,
            rating: 4.5
        }
    ];
    
    await Book.insertMany(sampleBooks);
    res.send("Database seeded with ALL 8 BOOKS (Rich Details)!");
});

// B. GET BOOKS (Home Page - Requirement b & e)
// Only returns books where isAvailable is TRUE
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find({ isAvailable: true });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// C. GET BOOK DETAILS (Details Page - Requirement c)
app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.json(book);
    } catch (err) {
        res.status(404).json({ error: "Book not found" });
    }
});

// D. PLACE ORDER (Checkout - Requirement e)
// This creates an order AND hides the purchased books
app.post('/api/orders', async (req, res) => {
    const { name, email, address, cartItems, totalPrice } = req.body;

    try {
        // 1. Save the Order
        const newOrder = new Order({
            name,
            email,
            address,
            cartItems,
            totalPrice
        });
        await newOrder.save();

        // 2. Hide purchased books from the Home Page
        // Loop through the cart and update each book's status
        for (const item of cartItems) {
            await Book.findByIdAndUpdate(item.bookId, { isAvailable: false });
        }

        res.json({ message: "Order confirmed! Books have been removed from inventory." });
    } catch (err) {
        res.status(500).json({ error: "Failed to place order." });
    }
});

// 6. START SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});