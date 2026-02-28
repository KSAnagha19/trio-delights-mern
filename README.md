#  Trio Delights – MERN Stack Restaurant App

A full-stack restaurant booking and ordering application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

This system allows users to book tables and place food orders through a responsive frontend interface connected to a RESTful backend API.

---

##  Features

-  Table booking system  
-  Food ordering with cart & checkout  
-  Booking details summary  
-  MongoDB database integration  
-  REST API using Express  
-  Responsive React frontend  

---

##  Tech Stack

### Frontend
- React.js
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

---

##  Project Structure

```
trio-delights-mern
│
├── client   # React frontend
└── server   # Node + Express backend
```
---

##  Setup Instructions

### 1️ Backend Setup

```bash
cd server
npm install

Create a .env file inside the server folder:

MONGO_URI=your_mongodb_connection
PORT=5000

#Run the backend:

node server.js
2️⃣ Frontend Setup
cd client
npm install
npm start

Frontend runs on:
http://localhost:3000

Backend runs on:
http://localhost:5000

 #API Endpoint

POST /api/book

Stores booking information in MongoDB.

 #Future Improvements

Prevent double table booking using database-level validation

Add booking cancellation feature

Build an admin dashboard

Integrate payment gateway (Razorpay / Stripe)

Add JWT authentication

Implement role-based access control

Add booking availability visualization

#Author

K S Anagha