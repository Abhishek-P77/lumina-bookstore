import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import Toast

function Cart({ cart, removeFromCart, clearCart }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', address: '' });

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            return toast.error("Your cart is empty!", { theme: "dark" });
        }

        const orderData = {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            cartItems: cart.map(item => ({ bookId: item._id, title: item.title, price: item.price })),
            totalPrice: totalPrice
        };

        try {
            await axios.post('http://localhost:5000/api/orders', orderData);
            
            // Professional Success Notification
            toast.success(`Order Placed! Thank you, ${formData.name}.`, {
                position: "top-center",
                autoClose: 5000,
                theme: "dark"
            });
            
            clearCart();
            navigate('/'); 
        } catch (error) {
            console.error("Checkout failed", error);
            toast.error("Checkout failed. Please try again.", { theme: "dark" });
        }
    };

    return (
        <div className="glass" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Your Shopping Bag</h2>
            
            {cart.length === 0 ? <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>Your bag is empty.</p> : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {cart.map((item, index) => (
                        <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '15px 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>📖</div>
                                <span style={{ fontSize: '1.1rem' }}>{item.title}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <span style={{ fontWeight: 'bold' }}>₹{item.price}</span>
                                <button onClick={() => removeFromCart(item._id)} style={{ background: '#ff3b30', padding: '8px 15px', fontSize: '0.9rem' }}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            
            <h3 style={{ marginTop: '30px', textAlign: 'right', fontSize: '1.5rem' }}>Total: ₹{totalPrice.toFixed(2)}</h3>
            <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '30px 0' }} />

            <h3>Checkout</h3>
            <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="Full Name" required 
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                />
                <input type="email" placeholder="Email" required 
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                />
                <textarea placeholder="Shipping Address" required rows="3"
                    value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} 
                />
                <button type="submit" style={{ padding: '15px', background: 'white', color: '#d76d77', fontSize: '1.2rem', marginTop: '10px' }}>
                    Confirm Purchase
                </button>
            </form>
        </div>
    );
}

export default Cart;