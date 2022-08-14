import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getAllProfiles, reset } from '../features/profile/profileSlice';
import { FaConnectdevelop } from 'react-icons/fa';
import ProfileItem from '../components/ProfileItem';

function Profiles() {
	const { isLoading, isError, profiles, message } = useSelector(
		state => state.profile
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllProfiles());
	}, [dispatch]);

	useEffect(() => {
		if (isError && message !== 'There is no profile') {
			toast.error(message);
			dispatch(reset());
		}
	}, [isError, message, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className="container">
			<h1 className="large text-primary">Developers</h1>
			<p className="lead">
				<FaConnectdevelop />
				Browse and connect with other developers
			</p>
			<div className="profiles">
				{profiles &&
					profiles.length !== 0 &&
					profiles.map(profile => (
						<ProfileItem profile={profile} key={profile._id} />
					))}
			</div>
		</div>
	);
}

export default Profiles;
