import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import {
	getSingleProfile,
	reset,
	getuserRepos,
} from '../features/profile/profileSlice';
import { FaCheck } from 'react-icons/fa';
import Moment from 'react-moment';
import RepoItem from '../components/RepoItem';

function Profile() {
	const params = useParams();

	const { isError, message, profile, isLoading, repos } = useSelector(
		state => state.profile
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (profile && profile.user._id === params.profileId) {
			dispatch(getuserRepos(profile.githubusername));
		} else {
			dispatch(getSingleProfile(params.profileId));
		}
	}, [params.profileId, profile, dispatch]);

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

	if (isLoading || profile === null) {
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
							{profile.website && (
								<a
									href={profile.website}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="fas fa-globe fa-2x"></i>
								</a>
							)}
							{profile.social.twitter && (
								<a
									href={profile.social.twitter}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="fas fa-twitter fa-2x"></i>
								</a>
							)}
							{profile.social.youtube && (
								<a
									href={profile.social.youtube}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="fa-brands fa-youtube fa-2x"></i>
								</a>
							)}
							{profile.social.facebook && (
								<a
									href={profile.social.facebook}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="fab fa-facebook fa-2x"></i>
								</a>
							)}
							{profile.social.linkedin && (
								<a
									href={profile.social.linkedin}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="fab fa-aedin fa-2x"></i>
								</a>
							)}
							{profile.social.instagram && (
								<a
									href={profile.social.instagram}
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="fab fa-instagram fa-2x"></i>
								</a>
							)}
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

					<div className="profile-github">
						<h2 className="text-primary my-1">
							<i className="fab fa-github"></i> Github Repos
						</h2>
						{repos.length > 0 ? (
							repos.map(r => <RepoItem key={r.id} repo={r} />)
						) : (
							<h4>No available repos!!</h4>
						)}
					</div>
				</div>
			</div>
		)
	);
}

export default Profile;
