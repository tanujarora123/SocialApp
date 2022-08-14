import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import {
	getMyProfile,
	deleteAccount,
	reset,
	clearProfile,
} from '../features/profile/profileSlice';
import { logout } from '../features/auth/authSlice';
import { clearPost } from '../features/post/postSlice';
import Spinner from '../components/Spinner';
import DashActions from '../components/DashActions';
import Experience from '../components/Experience';
import Education from '../components/Education';
import { FaUserMinus } from 'react-icons/fa';

function Dashbord() {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { isLoading, message, isError, profile } = useSelector(
		state => state.profile
	);
	const { user } = useSelector(state => state.auth);

	useEffect(() => {
		dispatch(getMyProfile());
	}, [dispatch]);

	useEffect(() => {
		if (isError) {
			toast.error(message);
			dispatch(reset());
		}
	}, [isError, message, dispatch]);

	const handleClick = () => {
		if (window.confirm('Are you sure want to delete your profile')) {
			dispatch(deleteAccount());
			dispatch(logout());
			dispatch(clearProfile());
			dispatch(clearPost());
			navigate('/');
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className="container">
			<h1 className="large text-primary">Dashbord</h1>
			<p className="lead">
				<FaUser /> Welcome {user.name}
			</p>
			{profile !== null ? (
				<>
					<DashActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
				</>
			) : (
				<>
					<p>
						You do not have a profile at this moment, Click below to
						provide some info
					</p>
					<Link to="/create-profile" className="btn btn-primary my-1">
						Create Profile
					</Link>
				</>
			)}
			{profile && (
				<div className="my-2">
					<button className="btn btn-danger" onClick={handleClick}>
						<FaUserMinus /> Delete My Account
					</button>
				</div>
			)}
		</div>
	);
}

export default Dashbord;
