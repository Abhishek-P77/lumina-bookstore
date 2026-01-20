import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // 1. State for search

    // Fetch books from server
    useEffect(() => {
        axios.get('http://localhost:5000/api/books')
            .then(res => setBooks(res.data))
            .catch(err => console.log(err));
    }, []);

    // 2. Filter Logic: Check Title or Author
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* --- SEARCH BAR SECTION --- */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ textShadow: '0 2px 5px rgba(0,0,0,0.3)', marginBottom: '20px' }}>
                    Find Your Next Adventure
                </h2>
                <input 
                    type="text" 
                    placeholder="Search by title or author..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ 
                        width: '100%', 
                        maxWidth: '500px', 
                        padding: '15px 25px', 
                        borderRadius: '50px', 
                        border: 'none', 
                        background: 'rgba(255, 255, 255, 0.2)', 
                        color: 'white', 
                        fontSize: '1.2rem',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                        outline: 'none',
                        backdropFilter: 'blur(5px)'
                    }}
                />
            </div>

            {/* --- BOOK GRID --- */}
            <div className="book-grid">
                {/* 3. Use filteredBooks instead of books */}
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <div key={book._id} className="book-card glass">
                            <img src={book.imageUrl} alt={book.title} className="book-image" />
                            <h3>{book.title}</h3>
                            {/* Truncated Description */}
                            <p style={{ fontSize: '0.9rem', margin: '10px 0', color: 'rgba(255,255,255,0.8)' }}>
                                {book.description.substring(0, 60)}...
                            </p>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>₹{book.price}</p>
                            <Link to={`/book/${book._id}`}>
                                <button>View Details</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    // Show this if no books match the search
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', opacity: 0.7 }}>
                        <h3>No books found matching "{searchTerm}"</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;