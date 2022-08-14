const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please add name'],
	},
	email: {
		type: String,
		required: [true, 'Please add email'],
	},
	password: {
		type: String,
		required: [true, 'Please add password'],
		minLength: [6, 'Password must be atleast 6 characters long'],
	},
	avatar: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(this.password, salt);

	this.password = hash;

	next();
});

userSchema.methods.getSignedToken = async function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

userSchema.methods.matchPassword = async function (pass) {
	return bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model('User', userSchema);
