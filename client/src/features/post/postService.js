import axios from 'axios';

const getAllPosts = async token => {
	const API_URL = 'api/v1/post';

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);

	return response.data;
};

const likePost = async (postId, token) => {
	const API_URL = `api/v1/post/like/${postId}`;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(API_URL, {}, config);

	return response.data;
};

const unlikePost = async (postId, token) => {
	const API_URL = `api/v1/post/unlike/${postId}`;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(API_URL, {}, config);

	return response.data;
};

export const createPost = async (post, token) => {
	const API_URL = 'api/v1/post';

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(API_URL, post, config);

	return data;
};

export const deletePost = async (id, token) => {
	const API_URL = `api/v1/post/${id}`;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	await axios.delete(API_URL, config);
};

const getPost = async (postId, token) => {
	const API_URL = `/api/v1/post/${postId}`;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);

	return response.data;
};

const createComment = async (id, comment, token) => {
	const API_URL = `/api/v1/post/comment/${id}`;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(API_URL, { text: comment }, config);

	return data;
};

const postService = {
	getAllPosts,
	likePost,
	unlikePost,
	createPost,
	deletePost,
	getPost,
	createComment,
};

export default postService;
