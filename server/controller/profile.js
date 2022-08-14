const asyncHandler = require('../utils/asyncHandler');
const profileModel = require('../model/Profile');
const CustomError = require('../utils/CustomError');
const userModel = require('../model/User');
const axios = require('axios');

exports.getMyProfile = asyncHandler(async (req, res, next) => {
	const profile = await profileModel
		.findOne({ user: req.user.id })
		.populate('user', ['name', 'email']);

	if (!profile) {
		return next(new CustomError('There is no profile', 400));
	}

	res.status(200).json({ success: true, data: profile });
});

exports.createProfile = asyncHandler(async (req, res, next) => {
	const {
		status,
		skills,
		company,
		website,
		location,
		bio,
		githubusername,
		youtube,
		facebook,
		twitter,
		instagram,
		linkedin,
	} = req.body;

	if (!status || !skills) {
		return next(new CustomError('Please provide status and skills', 400));
	}

	const profileData = {};

	profileData.user = req.user.id;

	if (status) profileData.status = status;
	if (location) profileData.location = location;
	if (website) profileData.website = website;
	if (bio) profileData.bio = bio;
	if (company) profileData.company = company;
	if (githubusername) profileData.githubusername = githubusername;
	if (skills) {
		profileData.skills = skills.split(',').map(skill => skill.trim());
	}

	profileData.social = {};

	profileData.social.youtube = youtube || '';
	profileData.social.twitter = twitter || '';
	profileData.social.instagram = instagram || '';
	profileData.social.linkedin = linkedin || '';
	profileData.social.facebook = facebook || '';

	let profile = await profileModel.findOne({ user: req.user.id });

	if (profile) {
		console.log('Updating profile');
		console.log(profileData.githubusername);

		profile = await profileModel.findOneAndUpdate(
			{ user: req.user.id },
			profileData,
			{ new: true, runValidators: true }
		);
	} else {
		console.log('Createing profile');

		profile = await profileModel.create(profileData);
		console.log(profile);
	}

	res.status(200).json({ success: true, data: profile });
});

exports.getAllProfiles = asyncHandler(async (req, res, next) => {
	const profiles = await profileModel
		.find()
		.populate('user', ['name', 'avatar']);

	res.status(200).json({ success: true, data: profiles });
});

exports.getUserProfile = asyncHandler(async (req, res, next) => {
	const profile = await profileModel
		.findOne({ user: req.params.userId })
		.populate('user', ['name', 'email', 'avatar']);

	if (!profile) {
		return next(new CustomError('No profile found', 404));
	}

	res.status(200).json({ success: true, data: profile });
});

exports.deleteProfile = asyncHandler(async (req, res, next) => {
	const profile = await profileModel.findOne({ user: req.user.id });

	await profile.remove();

	res.status(200).json({ success: true });
});

exports.addExperience = asyncHandler(async (req, res, next) => {
	const { title, company, from, location, to, description, current } =
		req.body;

	if (!title || !company || !from) {
		return next(
			new CustomError('Title, Company and from date is required', 400)
		);
	}

	const expData = {
		title,
		company,
		from,
		location,
		to,
		description,
		current,
	};

	const profile = await profileModel.findOne({ user: req.user.id });
	profile.experience.unshift(expData);

	await profile.save();

	return res.status(200).json({ success: true, data: profile });
});

exports.deleteExperience = asyncHandler(async (req, res, next) => {
	const profile = await profileModel.findOne({ user: req.user.id });

	profile.experience = profile.experience.filter(
		exp => exp.id.toString() !== req.params.exp_id
	);

	await profile.save();

	res.status(200).json({ success: true, data: profile });
});

exports.addEducation = asyncHandler(async (req, res, next) => {
	const { school, degree, fieldOfStudy, from, to, current, description } =
		req.body;

	if (!school || !degree || !fieldOfStudy || !from) {
		return next(
			new CustomError(
				'School, Degree, Field Of Study and from date is required',
				400
			)
		);
	}

	const eduData = {
		school,
		degree,
		fieldOfStudy,
		from,
		to,
		current,
		description,
	};

	const profile = await profileModel.findOne({ user: req.user.id });
	profile.education.unshift(eduData);

	await profile.save();

	res.status(200).json({ success: true, data: profile });
});

exports.deleteEducation = asyncHandler(async (req, res, next) => {
	const profile = await profileModel.findOne({ user: req.user.id });

	profile.education = profile.education.filter(
		edu => edu.id.toString() !== req.params.edu_id
	);

	await profile.save();

	res.status(200).json({ success: true, data: profile });
});

exports.getRepos = asyncHandler(async (req, res, next) => {
	const API_URL = `https://api.github.com/users/${req.params.githubusername}/repos?per_page=5&sort=created:desc`;

	const config = {
		headers: {
			'user-agent': 'node.js',
		},
	};

	const response = await axios.get(API_URL, config);

	res.status(200).json({ success: true, data: response.data });
});
