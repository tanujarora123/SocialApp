const express = require('express');
const router = express.Router();

const {
	getAllProfiles,
	getMyProfile,
	createProfile,
	getUserProfile,
	deleteProfile,
	addExperience,
	deleteExperience,
	addEducation,
	deleteEducation,
	getRepos,
} = require('../controller/profile');
const { protect } = require('../middleware/auth');

router.route('/me').get(protect, getMyProfile);
router
	.route('/')
	.get(getAllProfiles)
	.post(protect, createProfile)
	.delete(protect, deleteProfile);
router.route('/user/:userId').get(getUserProfile);
router.route('/experience').put(protect, addExperience);
router.route('/experience/:exp_id').delete(protect, deleteExperience);
router.route('/education').put(protect, addEducation);
router.route('/education/:edu_id').delete(protect, deleteEducation);
router.route('/github/:githubusername').get(getRepos);

module.exports = router;
