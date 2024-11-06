const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./init/mongodb');
const authRoutes = require('./routes');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares');
const notFound = require('./controllers/notFound');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true, limit: '500mb' 
}));
app.use(express.json({
    limit: '500mb'
}));
app.use(morgan('dev'));
app.use(errorHandler);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

app.use('/api/v1/auth', authRoutes);
app.use("*", notFound);

module.exports = app;
