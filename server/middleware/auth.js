const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/CustomError');
const jwt = require('jsonwebtoken');
const userModel = require('../model/User');

exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(new CustomError('Not authorized T', 401));
	}

	try {
		const decode = jwt.verify(token, process.env.JWT_SECRET);

		const user = await userModel.findById(decode.id);

		req.user = user;

		next();
	} catch (err) {
		return next(new CustomError('Not authorized D', 401));
	}
});
