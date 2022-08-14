const asyncHandler = require('../utils/asyncHandler');
const userModel = require('../model/User');
const CustomError = require('../utils/CustomError');

exports.getAuth = asyncHandler(async (req, res, next) => {
	const user = await userModel.findById(req.user.id).select('-password');

	res.status(200).json({ success: true, user });
});

exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new CustomError('Please provide email and password', 400));
	}

	const user = await userModel.findOne({ email });

	if (!user) {
		return next(new CustomError('Invalid credentials E', 400));
	}

	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new CustomError('Invalid credentials P', 400));
	}

	const token = await user.getSignedToken();

	res.status(200).json({
		success: true,
		token,
		name: user.name,
		email: user.email,
	});
});
