const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	company: String,
	location: String,
	website: String,
	status: {
		type: String,
		required: [true, 'Status is required'],
	},
	skills: {
		type: [String],
		required: [true, 'Skills are required'],
	},
	bio: String,
	githubusername: String,
	experience: [
		{
			title: {
				type: String,
				required: true,
			},
			company: {
				type: String,
				required: true,
			},
			location: {
				type: String,
			},
			from: {
				type: Date,
				required: true,
			},
			to: {
				type: Date,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
			},
		},
	],
	education: [
		{
			school: {
				type: String,
				required: true,
			},
			degree: {
				type: String,
				required: true,
			},
			fieldOfStudy: {
				type: String,
				required: true,
			},
			from: {
				type: Date,
				required: true,
			},
			to: {
				type: Date,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
			},
		},
	],
	social: {
		youtube: {
			type: String,
		},
		facebook: {
			type: String,
		},
		instagram: {
			type: String,
		},
		twitter: {
			type: String,
		},
		linkedin: {
			type: String,
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

profileSchema.pre('remove', async function (next) {
	console.log(`Deleting user ${this.user}`);
	await this.model('User').findByIdAndDelete(this.user);

	next();
});

module.exports = mongoose.model('Profile', profileSchema);
