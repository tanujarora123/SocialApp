import React from 'react';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { likePost, unlikePost, deletePost } from '../features/post/postSlice';
import Spinner from './Spinner';

function PostItem({ post, profile }) {
	const { isLoading } = useSelector(state => state.post);
	const dispatch = useDispatch();

	const handleLike = id => {
		dispatch(likePost(id));
	};
	const handleUnlike = id => {
		dispatch(unlikePost(id));
	};
	const handleDelete = id => {
		dispatch(deletePost(id));
	};

	if (isLoading || post === null) {
		return <Spinner />;
	}

	return (
		<div className="post bg-white my-1 p-1">
			<div>
				<Link to={`/profile/${post.user}`}>
					<img
						src={`https:${post.avatar}`}
						alt="profileImage"
						className="round-img"
					/>
					<h4>{post.name}</h4>
				</Link>
			</div>
			<div>
				<p className="my-1">{post.text}</p>
				<p className="post-date">
					Posted on{' '}
					{<Moment format="YYYY/MM/DD">{post.createdAt}</Moment>}
				</p>
				<button className="btn" onClick={() => handleLike(post._id)}>
					<FaThumbsUp /> <span>{post.likes.length}</span>
				</button>
				<button className="btn" onClick={() => handleUnlike(post._id)}>
					<FaThumbsDown />
				</button>
				<Link to={`/post/${post._id}`} className="btn btn-primary">
					Discussion <span>{post.comments.length}</span>
				</Link>

				{/* {profile.user._id === post.user && (
					<button type="button" className="btn btn-danger">
						<FaTimes />
					</button>
				)} */}
				{profile?.user?._id === post.user && (
					<button
						type="button"
						className="btn btn-danger"
						onClick={() => handleDelete(post._id)}
					>
						<FaTimes />
					</button>
				)}
			</div>
		</div>
	);
}

export default PostItem;
