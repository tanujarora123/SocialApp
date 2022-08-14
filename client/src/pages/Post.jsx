import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, createComment } from '../features/post/postSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import Moment from 'react-moment';

function Post() {
	const params = useParams();
	const postId = params.postId;

	const [text, setText] = useState('');

	const dispatch = useDispatch();

	const { isLoading, isError, message, post } = useSelector(
		state => state.post
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		dispatch(getPost(postId));
	}, [postId, isError, message, dispatch]);

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(createComment({ id: postId, text }));

		setText('');
	};

	return isLoading || post === null ? (
		<Spinner />
	) : (
		<div className="container">
			<Link to="/posts" className="btn">
				Back To Posts
			</Link>
			<div className="post bg-white p-1 my-1">
				<div>
					<Link to={`/profile/${post.user}`}>
						<img
							className="round-img"
							src={`https:${post.avatar}`}
							alt=""
						/>
						<h4>{post.name}</h4>
					</Link>
				</div>
				<div>
					<p className="my-1">{post.text}</p>
				</div>
			</div>
			<div className="post-form">
				<div className="post-form-header bg-primary">
					<h3>Leave A Comment</h3>
				</div>
				<form className="form my-1" onSubmit={handleSubmit}>
					<textarea
						name="text"
						cols="30"
						rows="5"
						value={text}
						onChange={e => setText(e.target.value)}
						placeholder="Comment on this post"
					></textarea>
					<input
						type="submit"
						className="btn btn-dark my-1"
						value="Submit"
					/>
				</form>
			</div>
			<div className="posts">
				{post.comments.map(comment => (
					<div key={comment._id} className="post bg-white my-1 p-1">
						<div>
							<Link to={`/profile/${comment.user}`}>
								<img
									src={`https:${comment.avatar}`}
									alt="profileImage"
									className="round-img"
								/>
								<h4>{comment.name}</h4>
							</Link>
						</div>
						<div>
							<p className="my-1">{comment.text}</p>
							<p className="post-date">
								Posted on{' '}
								{
									<Moment format="YYYY/MM/DD">
										{comment.createdAt}
									</Moment>
								}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Post;
