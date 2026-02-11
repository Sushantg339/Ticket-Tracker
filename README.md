Ticket Tracker

A simple ticket tracking app with user authentication and ticket management.

🚀 Setup
Backend
cd backend
npm install


Create a .env file with:

NODE_ENV = 'development'
PORT=3000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>


Run the backend:

npm run dev


Server will start at: http://localhost:3000

Frontend
cd frontend
npm install
npm run dev


Frontend will run at: http://localhost:5173

Note: Start the backend first. Frontend relies on backend APIs.

⚙️ Assumptions

Users must be registered to access tickets.

JWT authentication via cookies is used.

MongoDB is running and accessible.

API endpoints follow REST conventions.
