Minimal Luxury Restaurant Project (Frontend + Backend)
Structure:
/mnt/data/resto_final_project

To run backend:
1. cd server
2. npm install
3. create .env or edit existing .env (MONGO_URI)
4. node server.js

To run frontend:
1. cd client
2. ensure you have a React app (this src folder must be placed inside a create-react-app structure)
3. npm install (if needed)
4. npm start

Notes:
- Backend listens on port 5000 and exposes POST /api/book for booking.
- Frontend is configured to POST to http://localhost:5000/api/book
