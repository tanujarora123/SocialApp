import React, { useState, useEffect } from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createEducation, reset } from '../features/profile/profileSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function AddEducation() {
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
			toast.success('Education added');
			navigate('/dashbord');
		}

		dispatch(reset());
	}, [isError, isSuccess, message, navigate, dispatch]);

	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldOfStudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const { school, degree, fieldOfStudy, from, to, current, description } =
		formData;

	const handleChange = e =>
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(createEducation(formData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className="container">
			<h1 className="large text-primary">Add Your Education</h1>
			<p className="lead">
				<FaGraduationCap /> Add any school, bootcamp, etc that you have
				attended
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						placeholder="* School or Bootcamp"
						name="school"
						value={school}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Degree or Certificate"
						name="degree"
						value={degree}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Field Of Study"
						name="fieldOfStudy"
						value={fieldOfStudy}
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
				{!current && (
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
						Current School
					</p>
				</div>
				<div className="form-group">
					<textarea
						name="description"
						cols="30"
						rows="5"
						placeholder="Program Description"
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

export default AddEducation;
