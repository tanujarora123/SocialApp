const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/CustomError');
const postModel = require('../model/Post');

exports.createPost = asyncHandler(async (req, res, next) => {
	const { text } = req.body;

	if (!text) {
		return next(new CustomError('Text is required', 400));
	}

	const postData = {
		text,
		user: req.user.id,
		name: req.user.name,
		avatar: req.user.avatar,
	};

	const post = await postModel.create(postData);

	res.status(200).json({ success: true, data: post });
});

exports.getPosts = asyncHandler(async (req, res, next) => {
	const posts = await postModel.find().sort({ createdAt: -1 });

	res.status(200).json({ success: true, data: posts });
});

exports.getPost = asyncHandler(async (req, res, next) => {
	const post = await postModel.findById(req.params.postId);

	if (!post) {
		return next(new CustomError('Post not found', 404));
	}

	res.status(200).json({ success: true, data: post });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
	const post = await postModel.findById(req.params.postId);

	if (post.user.toString() !== req.user.id) {
		return next(new CustomError('Not authorized to delete', 401));
	}

	await post.remove();

	res.status(200).json({ success: true });
});

exports.likePost = asyncHandler(async (req, res, next) => {
	const post = await postModel.findById(req.params.postId);

	const alreadyLiked = post.likes.some(
		likeUser => likeUser.user.toString() === req.user.id
	);

	if (alreadyLiked) {
		return next(new CustomError('You already llked this post', 400));
	}

	post.likes.unshift({ user: req.user.id });

	await post.save();

	res.status(200).json({ success: true, data: post.likes });
});

exports.unlikePost = asyncHandler(async (req, res, next) => {
	const post = await postModel.findById(req.params.postId);

	const alreadyLiked = post.likes.some(
		likeUser => likeUser.user.toString() === req.user.id
	);

	if (!alreadyLiked) {
		return next(new CustomError('You have not llked this post yet', 400));
	}

	post.likes = post.likes.filter(
		likeUser => likeUser.user.toString() !== req.user.id
	);

	await post.save();

	res.status(200).json({ success: true, data: post.likes });
});

exports.commentPost = asyncHandler(async (req, res, next) => {
	const { text } = req.body;

	if (!text) {
		return next(new CustomError('Text for comment is required', 400));
	}

	const post = await postModel.findById(req.params.postId);

	const commentData = {
		user: req.user.id,
		text,
		name: req.user.name,
		avatar: req.user.avatar,
	};

	post.comments.unshift(commentData);

	await post.save();

	res.status(200).json({ success: true, data: post.comments });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
	const post = await postModel.findById(req.params.postId);

	const commnetToDelete = post.comments.find(
		comment => comment.id.toString() === req.params.commentId
	);

	if (!commnetToDelete) {
		return next(new CustomError('No comment found', 404));
	}

	if (req.user.id !== commnetToDelete.user.toString()) {
		return next(new CustomError('Not authorized to delete', 400));
	}

	post.comments = post.comments.filter(
		comment => comment.id.toString() !== req.params.commentId
	);

	await post.save();

	res.status(200).json({ success: true, data: post.comments });
});
