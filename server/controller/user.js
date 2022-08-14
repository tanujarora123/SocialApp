const userModel = require('../model/User');
const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/CustomError');
const gravatar = require('gravatar');

exports.registerUser = asyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body;

	const userCheck = await userModel.findOne({ email });

	if (userCheck) {
		return next(new CustomError('User already exists', 400));
	}

	const gravatarLink = gravatar.url(email, {
		s: '200',
		r: 'pg',
		d: 'mm',
	});

	const user = await userModel.create({
		name,
		email,
		password,
		avatar: gravatarLink,
	});

	const token = await user.getSignedToken();

	res.status(200).json({
		success: true,
		token,
		name: user.name,
		email: user.email,
	});
});
