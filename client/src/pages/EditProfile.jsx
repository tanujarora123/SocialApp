import React, { useState, useEffect } from 'react';
import {
	FaUser,
	FaTwitter,
	FaFacebook,
	FaYoutube,
	FaInstagram,
	FaLinkedin,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createProfile, reset } from '../features/profile/profileSlice';
import Spinner from '../components/Spinner';

function EditProfile() {
	const { isSuccess, isLoading, isError, message, profile } = useSelector(
		state => state.profile
	);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	useEffect(() => {
		setFormData({
			status: profile.status ? profile.status : '',
			website: profile.website ? profile.website : '',
			company: profile.company ? profile.company : '',
			location: profile.location ? profile.location : '',
			bio: profile.bio ? profile.bio : '',
			githubusername: profile.githubusername
				? profile.githubusername
				: '',
			skills: profile.skills.length > 0 ? profile.skills.join(', ') : '',
			twitter: profile.social.twitter ? profile.social.twitter : '',
			facebook: profile.social.facebook ? profile.social.facebook : '',
			youtube: profile.social.youtube ? profile.social.youtube : '',
			instagram: profile.social.instagram ? profile.social.instagram : '',
			linkedin: profile.social.linkedin ? profile.social.linkedin : '',
		});
		//console.log(profile);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success('Profile updated');
		}

		dispatch(reset());
	}, [isError, isSuccess, profile, message, navigate, dispatch]);

	const [showSocial, setShowSocial] = useState(false);

	const [formData, setFormData] = useState({
		status: '',
		company: '',
		website: '',
		location: '',
		skills: '',
		githubusername: '',
		bio: '',
		twitter: '',
		facebook: '',
		instagram: '',
		linkedin: '',
		youtube: '',
	});

	const {
		status,
		company,
		location,
		website,
		skills,
		githubusername,
		bio,
		twitter,
		facebook,
		youtube,
		instagram,
		linkedin,
	} = formData;

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(createProfile(formData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className="container">
			<h1 className="large text-primary">Edit Your Profile</h1>
			<p className="lead">
				<FaUser /> Let's get some information to make your profile stand
				out
			</p>
			<small>* = required fields</small>

			<form className="form" onSubmit={handleSubmit}>
				<div className="form-group">
					<select
						name="status"
						value={status}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								[e.target.name]: e.target.value,
							}))
						}
					>
						<option value="0">* Select Professional Status</option>
						<option value="Developer">Developer</option>
						<option value="Junior Developer">
							Junior Developer
						</option>
						<option value="Senior Developer">
							Senior Developer
						</option>
						<option value="Manager">Manager</option>
						<option value="Student or Learning">
							Student or Learning
						</option>
						<option value="Instructor">
							Instructor or Teacher
						</option>
						<option value="Intern">Intern</option>
						<option value="Other">Other</option>
					</select>
					<small className="form-text">
						Give us an idea of where you are at in your career
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Company"
						name="company"
						value={company}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								[e.target.name]: e.target.value,
							}))
						}
					/>
					<small className="form-text">
						Could be your own company or one you work for
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Website"
						name="website"
						value={website}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								[e.target.name]: e.target.value,
							}))
						}
					/>
					<small className="form-text">
						Could be your own or a company website
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								[e.target.name]: e.target.value,
							}))
						}
					/>
					<small className="form-text">
						City & state suggested (eg. Boston, MA)
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Skills"
						name="skills"
						value={skills}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								[e.target.name]: e.target.value,
							}))
						}
					/>
					<small className="form-text">
						Please use comma separated values (eg.
						HTML,CSS,JavaScript,PHP)
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Github Username"
						name="githubusername"
						value={githubusername}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								[e.target.name]: e.target.value,
							}))
						}
					/>
					<small className="form-text">
						If you want your latest repos and a Github link, include
						your username
					</small>
				</div>
				<div className="form-group">
					<textarea
						placeholder="A short bio of yourself"
						name="bio"
						value={bio}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								[e.target.name]: e.target.value,
							}))
						}
					></textarea>
					<small className="form-text">
						Tell us a little about yourself
					</small>
				</div>
				<div className="my-2">
					<button
						type="button"
						className="btn btn-light"
						onClick={() => setShowSocial(!showSocial)}
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>

				{showSocial && (
					<>
						<div className="form-group social-input">
							<FaTwitter
								style={{ color: '#38a1f3', fontSize: '2rem' }}
							/>
							<input
								type="text"
								placeholder="Twitter URL"
								name="twitter"
								value={twitter}
								onChange={e =>
									setFormData(prev => ({
										...prev,
										[e.target.name]: e.target.value,
									}))
								}
							/>
						</div>

						<div className="form-group social-input">
							<FaFacebook
								style={{ color: '#3b5998', fontSize: '2rem' }}
							/>
							<input
								type="text"
								placeholder="Facebook URL"
								name="facebook"
								value={facebook}
								onChange={e =>
									setFormData(prev => ({
										...prev,
										[e.target.name]: e.target.value,
									}))
								}
							/>
						</div>

						<div className="form-group social-input">
							<FaYoutube
								style={{ color: '#c4302b', fontSize: '2rem' }}
							/>
							<input
								type="text"
								placeholder="YouTube URL"
								name="youtube"
								value={youtube}
								onChange={e =>
									setFormData(prev => ({
										...prev,
										[e.target.name]: e.target.value,
									}))
								}
							/>
						</div>

						<div className="form-group social-input">
							<FaLinkedin
								style={{ color: '#0077b5', fontSize: '2rem' }}
							/>
							<input
								type="text"
								placeholder="Linkedin URL"
								name="linkedin"
								value={linkedin}
								onChange={e =>
									setFormData(prev => ({
										...prev,
										[e.target.name]: e.target.value,
									}))
								}
							/>
						</div>

						<div className="form-group social-input">
							<FaInstagram
								style={{ color: '#3f729b', fontSize: '2rem' }}
							/>
							<input
								type="text"
								placeholder="Instagram URL"
								name="instagram"
								value={instagram}
								onChange={e =>
									setFormData(prev => ({
										...prev,
										[e.target.name]: e.target.value,
									}))
								}
							/>
						</div>
					</>
				)}

				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashbord">
					Go Back
				</Link>
			</form>
		</div>
	);
}

export default EditProfile;
