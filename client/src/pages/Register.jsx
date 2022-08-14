import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const dispatch = useDispatch();
	const { isError, isSuccess, isLoading, message, user } = useSelector(
		state => state.auth
	);

	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate('/dashbord');
		}

		dispatch(reset());
	}, [isError, isSuccess, user, message, dispatch, navigate]);

	const handleChange = e => {
		setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (password !== password2) {
			toast.error('Passwords do not match!!');
			return;
		}

		dispatch(register(formData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<section className="container">
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">
				<FaUser /> Create Your Account
			</p>
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						id="name"
						placeholder="Name"
						value={name}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						id="email"
						placeholder="Email Address"
						value={email}
						onChange={handleChange}
						required
					/>
					<small className="form-text">
						This site uses Gravatar, so if you want a profile image,
						use a Gravatar email
					</small>
				</div>
				<div className="form-group">
					<input
						type="password"
						id="password"
						placeholder="Password"
						minLength="6"
						value={password}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						id="password2"
						placeholder="Confirm Password"
						minLength="6"
						value={password2}
						onChange={handleChange}
					/>
				</div>
				<input
					type="submit"
					value="Register"
					className="btn btn-primary"
				/>
			</form>
			<p className="my-1">
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</section>
	);
}

export default Register;
