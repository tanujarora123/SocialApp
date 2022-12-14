const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

const connectDB = require('./config/db');

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const postRoute = require('./routes/post');

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/user', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/post', postRoute);

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../', 'client', 'build')));

	app.get('*', (req, res) =>
		res.sendFile(
			path.join(__dirname, '../', 'client', 'build', 'index.html')
		)
	);
}

const PORT = process.env.PORT || 8000;

const server = app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error occured: ${err.message}`);
	server.close(() => {
		process.exit(1);
	});
});
