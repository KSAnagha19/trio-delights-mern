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

## Author

K S Anagha