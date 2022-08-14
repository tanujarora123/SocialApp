import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { getSingleProfile, reset } from '../features/profile/profileSlice';
import { FaCheck } from 'react-icons/fa';
import Moment from 'react-moment';

function Profile() {
	const params = useParams();

	const { isError, message, profile, isLoading } = useSelector(
		state => state.profile
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSingleProfile(params.profileId));
	}, [params.profileId, dispatch]);

	useEffect(() => {
		if (isError) {
			toast.error(message);
			dispatch(reset());
		}
	}, [isError, message, dispatch]);

	// useEffect(() => {
	// 	if (isError) {
	// 		toast.error(message);
	// 	}

	// 	dispatch(getuserRepos(profile.githubusername));
	// }, [isError, message, params.profileId, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		profile && (
			<div className="container">
				<Link to="/profiles" className="btn">
					Back to profiles
				</Link>

				<div className="profile-grid my-1">
					<div className="profile-top bg-primary p-2">
						<img
							src={`https:${profile.user.avatar}`}
							alt="profileImage"
							className="round-img"
						/>
						<h1 className="large">{profile.user.name}</h1>
						<p className="lead">
							{profile.status} at {profile.company}
						</p>
						<p>
							{profile.location && (
								<span>{profile.location}</span>
							)}
						</p>
						<div className="icons my-1">
							<Link to="!#">
								<i className="fas fa-globe fa-2x"></i>
							</Link>
							<Link to="!#">
								<i className="fab fa-twitter fa-2x"></i>
							</Link>
							<Link to="!#">
								<i className="fab fa-facebook fa-2x"></i>
							</Link>
							<Link to="!#">
								<i className="fab fa-linkedin fa-2x"></i>
							</Link>
							<Link to="!#">
								<i className="fab fa-instagram fa-2x"></i>
							</Link>
						</div>
					</div>

					<div className="profile-about p-2 bg-light">
						<h2 className="text-primary">
							{profile.user.name}'s Bio
						</h2>
						<p>{profile.bio}</p>
						<div className="line"></div>
						<h2 className="text-primary">Skill Set</h2>
						<div className="skills">
							{profile.skills.length !== 0 && (
								<>
									{profile.skills.map((skill, index) => (
										<div className="p-1" key={index}>
											<FaCheck />
											{skill}
										</div>
									))}
								</>
							)}
						</div>
					</div>

					<div className="profile-exp bg-white p-2">
						<h2 className="text-primary">Experiences</h2>
						{profile.experience.map(exp => (
							<div key={exp._id}>
								<h3>{exp.company}</h3>
								<p>
									<Moment format="YYYY/MM/DD">
										{exp.from}
									</Moment>{' '}
									-{' '}
									{exp.to ? (
										<Moment format="YYYY/MM/DD">
											{exp.to}
										</Moment>
									) : (
										`Now`
									)}
								</p>
								<p>
									<strong>Position: </strong>
									{exp.title}
								</p>
								<p>
									<strong>Description: </strong>
									{exp.description}
								</p>
							</div>
						))}
					</div>

					<div className="profile-edu bg-white p-2">
						<h2 className="text-primary">Education</h2>
						{profile.education.map(edu => (
							<div key={edu._id}>
								<h3>{edu.school}</h3>
								<p>
									<Moment format="YYYY/MM/DD">
										{edu.from}
									</Moment>{' '}
									-{' '}
									{edu.to ? (
										<Moment format="YYYY/MM/DD">
											{edu.to}
										</Moment>
									) : (
										`Now`
									)}
								</p>
								<p>
									<strong>Degree: </strong>
									{edu.degree}
								</p>
								<p>
									<strong>Field of study: </strong>
									{edu.fieldOfStudy}
								</p>
								<p>
									<strong>Description: </strong>
									{edu.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	);
}

export default Profile;
