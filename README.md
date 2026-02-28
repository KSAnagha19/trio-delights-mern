# Trio Delights – MERN Stack Restaurant App

A full-stack restaurant booking and ordering application built using the MERN stack.

## Features

- Table booking system
- Food ordering with cart & checkout
- Booking details summary
- MongoDB database integration
- REST API using Express
- Responsive React frontend

---

## Tech Stack

Frontend:
- React.js
- CSS

Backend:
- Node.js
- Express.js

Database:
- MongoDB

---

## Project Structure

trio-delights-mern/
│
├── client/ (React frontend)
└── server/ (Node + Express backend)

---

## Setup Instructions

### Backend

cd server  
npm install  

Create a `.env` file inside server folder:

MONGO_URI=your_mongodb_connection  
PORT=5000  

node server.js  

---

### Frontend

cd client  
npm install  
npm start  

---

## API Endpoint

POST /api/book  
Used to store booking information in MongoDB.

---

## Future Improvements

-  Prevent double table booking using database-level validation (compound unique index on table, date, and time).
-  Add booking cancellation feature with DELETE API endpoint.
-  Build an admin dashboard to manage bookings and food orders.
-  Integrate online payment gateway (e.g., Razorpay) for secure order confirmation.
-  Add JWT-based authentication for user login and role-based access control.
- Add booking availability visualization to dynamically disable reserved time slots.

## Author

K S Anagha