import axios from 'axios';

const getLoggedInUserProfile = async token => {
	const API_URL = `/api/v1/profile/me`;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);

	return response.data;
};

const createProfile = async (profileData, token) => {
	const API_URL = '/api/v1/profile';

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, profileData, config);

	return response.data;
};

const createExperience = async (expData, token) => {
	const API_URL = '/api/v1/profile/experience';

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(API_URL, expData, config);

	return response.data;
};

const createEducation = async (expData, token) => {
	const API_URL = '/api/v1/profile/education';

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(API_URL, expData, config);

	return response.data;
};

const deleteExperience = async (expId, token) => {
	const API_URL = `/api/v1/profile/experience/${expId}`;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL, config);

	return response.data;
};

const deleteEducation = async (eduId, token) => {
	const API_URL = `/api/v1/profile/education/${eduId}`;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL, config);

	return response.data;
};

const deleteAccount = async token => {
	const API_URL = `/api/v1/profile`;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL, config);

	return response.data;
};

const getAllProfiles = async () => {
	const API_URL = `/api/v1/profile`;

	const response = await axios.get(API_URL);

	return response.data;
};

const getSingleProfile = async id => {
	const API_URL = `/api/v1/profile/user/${id}`;

	const response = await axios.get(API_URL);

	return response.data;
};

const getuserRepos = async username => {
	const API_URL = `/api/v1/profile/github/${username}`;

	const response = await axios.get(API_URL);

	return response.data;
};

const profileService = {
	getAllProfiles,
	getSingleProfile,
	getuserRepos,
	getLoggedInUserProfile,
	createProfile,
	createExperience,
	createEducation,
	deleteExperience,
	deleteEducation,
	deleteAccount,
};

export default profileService;
