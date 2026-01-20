import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaStar, FaBookOpen, FaLayerGroup } from 'react-icons/fa'; // Icons for details

function BookDetails({ addToCart }) {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/books/${id}`)
            .then(res => setBook(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!book) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

    return (
        <div className="glass" style={{ maxWidth: '900px', margin: '40px auto', padding: '40px', position: 'relative' }}>
            
            {/* Back Button */}
            <Link to="/" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
                <FaArrowLeft /> Back to Store
            </Link>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '50px', flexWrap: 'wrap' }}>
                
                {/* LEFT: Large Image */}
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <img 
                        src={book.imageUrl} 
                        alt={book.title} 
                        style={{ 
                            width: '100%', 
                            borderRadius: '15px', 
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            transform: 'rotate(-2deg)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }} 
                    />
                </div>

                {/* RIGHT: Detailed Info */}
                <div style={{ flex: '1.5', minWidth: '300px', color: 'white' }}>
                    
                    {/* Category Badge */}
                    <span style={{ 
                        background: 'rgba(255, 215, 0, 0.2)', 
                        color: '#ffd700', 
                        padding: '5px 15px', 
                        borderRadius: '20px', 
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                    }}>
                        {book.category || 'General'}
                    </span>

                    <h1 style={{ fontSize: '2.5rem', margin: '15px 0 10px' }}>{book.title}</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '20px' }}>by {book.author}</p>

                    {/* Stats Row (Rating, Pages, etc) */}
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaStar style={{ color: '#ffd700' }} /> 
                            <span>{book.rating || 4.5}/5.0</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaBookOpen /> 
                            <span>{book.pages || 200} Pages</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaLayerGroup /> 
                            <span>Hardcover</span>
                        </div>
                    </div>

                    {/* Description */}
                    <h3 style={{ marginBottom: '10px' }}>Synopsis</h3>
                    <p style={{ lineHeight: '1.8', opacity: 0.85, fontSize: '1.05rem', marginBottom: '30px' }}>
                        {book.description}
                    </p>

                    {/* Price & Action */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <h2 style={{ fontSize: '2rem', color: '#ffd700' }}>₹{book.price}</h2>
                        <button 
                            onClick={() => addToCart(book)}
                            style={{ 
                                padding: '15px 40px', 
                                fontSize: '1.1rem', 
                                background: 'white', 
                                color: '#d76d77', 
                                border: 'none', 
                                borderRadius: '30px', 
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                boxShadow: '0 5px 15px rgba(255, 255, 255, 0.3)',
                                transition: 'transform 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Add to Bag
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default BookDetails;