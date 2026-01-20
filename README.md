# 📚 Lumina Books | Premium MERN Bookstore

> A modern, full-stack online bookstore featuring a "Liquid Glass" dark UI, real-time inventory management, and a seamless shopping experience.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📖 About The Project

**Lumina Books** is a complete e-commerce application built using the **MERN Stack** (MongoDB, Express, React, Node.js). It moves away from standard flat designs to offer a premium **"Liquid Glass" aesthetic** (Glassmorphism) with deep blur effects, glowing interactions, and smooth transitions.

The app handles full data flow: from browsing and searching products to managing a shopping cart and processing mock checkout orders that update real-time inventory.

## ✨ Key Features

### 🎨 User Interface (UI)
- **Liquid Glass Design:** Translucent cards, frosted backgrounds, and neon-glass glows.
- **Responsive Layout:** Optimized for desktops, tablets, and mobile devices.
- **Mega Footer:** Professional 3-column footer with hover effects and social links.

### 🛒 Functionality
- **Instant Search:** Real-time filtering of books by Title or Author.
- **Rich Book Details:** Dynamic pages showing long synopses, page counts, ratings, and categories.
- **Smart Cart System:** - Add to Bag / Remove from Bag.
  - Auto-calculation of totals in Indian Rupees (₹).
  - **Inventory Management:** Purchased items are automatically removed from the database.
- **Interactive Notifications:** Sleek dark-mode toast notifications for user actions (e.g., "Added to Cart", "Order Placed").

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js, React Router, Axios, React Toastify, React Icons |
| **Styling** | CSS3 (Variables, Flexbox, Grid, Backdrop-Filter) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Cloud) |
| **Version Control** | Git & GitHub |

## 🚀 How to Run Locally

Follow these steps to get the project running on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/Abhishek-P77/lumina-bookstore.git](https://github.com/Abhishek-P77/lumina-bookstore.git)
cd lumina-bookstore

2. Setup the Backend (Server)
The backend runs on port 5000.

cd server
npm install    # Install dependencies (Express, Mongoose, CORS)
node index.js  # Start the server

3. Setup the Frontend (Client)
Open a new terminal. The frontend runs on port 3000.

cd client
npm install    # Install dependencies (React, Toastify, Icons)
npm start      # Launch the React App

4. Initialize Database Data
To populate your database with the initial set of 8 premium books (including Wings of Fire, Atomic Habits, etc.), open your browser and visit:

http://localhost:5000/api/seed

You will see a confirmation message: "Database seeded with ALL 8 BOOKS!"

📂 Project Structure
lumina-bookstore/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── pages/          # Home, BookDetails, Cart
│   │   ├── App.js          # Main Component & Routing
│   │   ├── App.css         # Glassmorphism Styles
│   │   └── ...
│   └── ...
├── server/                 # Node.js Backend
│   ├── models/             # Database Schema (Book.js, Order.js)
│   ├── index.js            # API Routes & Server Config
│   └── ...
└── README.md

🔌 API Endpoints

Method,Endpoint,Description
GET,/api/books,Fetch all available books.
GET,/api/books/:id,Get details of a single book.
GET,/api/seed,Reset and populate the database.
POST,/api/orders,Place a new order & update inventory.

👤 Author
Abhishek P - GitHub: @Abhishek-P77

© 2026 Lumina Books. Designed with 💖 and React.
