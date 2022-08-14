import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts, createPost, reset } from '../features/post/postSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import PostItem from '../components/PostItem';
import { getMyProfile } from '../features/profile/profileSlice';

function Posts() {
	const [text, setText] = useState('');

	const dispatch = useDispatch();
	const { posts, isLoading, isError, message } = useSelector(
		state => state.post
	);
	const { profile, isLoading: profileLoading } = useSelector(
		state => state.profile
	);

	useEffect(() => {
		if (isError && message !== 'There is no profile') {
			toast.error(message);
			dispatch(reset());
		}

		dispatch(getMyProfile());

		dispatch(getAllPosts());
	}, [isError, message, dispatch]);

	// if (isLoading || profile === null) {
	// 	return <Spinner />;
	// }

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(createPost({ text }));
		setText('');
	};

	if (isLoading || profileLoading) {
		return <Spinner />;
	}

	return (
		<div className="container">
			<h1 className="large text-primary">Posts</h1>
			<p className="lead">
				<FaUser />
				Welcome to community
			</p>
			<div className="post-form">
				<div className="post-form-header bg-primary">
					<h3>Say Something...</h3>
				</div>
				<form className="form my-1" onSubmit={handleSubmit}>
					<textarea
						cols="30"
						rows="5"
						placeholder="Create a post"
						value={text}
						onChange={e => setText(e.target.value)}
					></textarea>
					<input
						type="submit"
						value="Submit"
						className="btn btn-dark my-1"
					/>
				</form>
				{/* <div className="posts">
					{posts.map(post => (
						<PostItem
							key={post._id}
							post={post}
							profile={profile}
						/>
					))}
				</div> */}
				<div className="posts">
					{posts.map(post => (
						<PostItem
							key={post._id}
							post={post}
							profile={profile && profile}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Posts;
