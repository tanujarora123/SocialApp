const express = require('express');
const router = express.Router();

const {
	createPost,
	getPosts,
	getPost,
	deletePost,
	likePost,
	unlikePost,
	commentPost,
	deleteComment,
} = require('../controller/post');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, createPost).get(protect, getPosts);
router.route('/:postId').get(protect, getPost).delete(protect, deletePost);
router.route('/like/:postId').put(protect, likePost);
router.route('/unlike/:postId').put(protect, unlikePost);
router.route('/comment/:postId').post(protect, commentPost);
router.route('/comment/:postId/:commentId').delete(protect, deleteComment);

module.exports = router;
