const mongoose = require('mongoose');

// This defines the structure of a "Book" in your database
const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    price: Number,
    imageUrl: String,
    isAvailable: { type: Boolean, default: true },
    
    // New fields for the "View Details" page
    category: { type: String, default: 'General' },
    pages: { type: Number, default: 200 },
    rating: { type: Number, default: 4.5 }
});

module.exports = mongoose.model('Book', BookSchema);