const CustomError = require('../utils/CustomError');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.statusCode = err.statusCode || 500;
	error.message = err.message || 'Server Error';

	console.log(err.name);

	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map(val => val.message);
		error = new CustomError(message, 400);
	}

	if (err.name === 'CastError') {
		const message = `Resource ${err.value} not found`;
		error = new CustomError(message, 404);
	}

	if (err.name === 'AxiosError') {
		const message = `Github repos not found`;
		error = new CustomError(message, 404);
	}

	res.status(error.statusCode).json({
		success: false,
		message: error.message,
	});
};

module.exports = errorHandler;
