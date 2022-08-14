import React, { useState, useEffect } from 'react';
import { FaCodeBranch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createExperience, reset } from '../features/profile/profileSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function AddExperience() {
	const navigate = useNavigate();

	const { isSuccess, isError, isLoading, message } = useSelector(
		state => state.profile
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success('Experience added');
			navigate('/dashbord');
		}

		dispatch(reset());
	}, [isError, isSuccess, message, navigate, dispatch]);

	const [formData, setFormData] = useState({
		title: '',
		location: '',
		company: '',
		to: '',
		from: '',
		current: false,
		description: '',
	});

	const { title, company, location, to, from, current, description } =
		formData;

	const handleChange = e =>
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(createExperience(formData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className="container">
			<h1 className="large text-primary">Add An Experience</h1>
			<p className="lead">
				<FaCodeBranch /> Add any developer/programming positions that
				you have had in the past
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Job Title"
						name="title"
						value={title}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Company"
						name="company"
						value={company}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<h4>From Date</h4>
					<input
						type="date"
						name="from"
						value={from}
						onChange={handleChange}
					/>
				</div>
				{!formData.current && (
					<>
						<div className="form-group">
							<h4>To Date</h4>
							<input
								type="date"
								name="to"
								value={to}
								onChange={handleChange}
							/>
						</div>
					</>
				)}
				<div className="form-group">
					<p>
						<input
							type="checkbox"
							name="current"
							checked={current}
							onChange={() =>
								setFormData(prev => ({
									...prev,
									current: !current,
								}))
							}
						/>{' '}
						Current Job
					</p>
				</div>
				<div className="form-group">
					<textarea
						name="description"
						cols="30"
						rows="5"
						placeholder="Job Description"
						value={description}
						onChange={handleChange}
					></textarea>
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn my-1" to="/dashbord">
					Go Back
				</Link>
			</form>
		</div>
	);
}

export default AddExperience;
