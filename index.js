// index.js or app.js
require('dotenv').config();  // Load environment variables

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

// Import routes and DB connection
const mongoose_connection = require('./db/connection');
const public_router = require('./router/public');
const auth_router = require('./router/auth');
const admin_router = require('./router/admin');
const patient_router = require('./router/patient');
const doctor_router = require('./router/doctor');

const app = express();

// CORS setup
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware setup
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// Use routers
app.use('/public', public_router);
app.use(auth_router);
app.use(admin_router);
app.use(patient_router);
app.use(doctor_router);

// Catch-all route to handle 404 or unmatched routes
app.all('*', (req, res) => {
  res.send('Hello World!');
});

// Start the server after connecting to MongoDB
mongoose_connection().then(() => {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
