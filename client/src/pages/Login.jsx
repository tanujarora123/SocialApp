import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const dispatch = useDispatch();
	const { isSuccess, isError, isLoading, message, user } = useSelector(
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
	}, [isError, isSuccess, message, user, dispatch, navigate]);

	const handleChange = e =>
		setFormData(prev => ({ ...formData, [e.target.id]: e.target.value }));

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(login(formData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className="container">
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead">
				<FaUser /> Sign into your account
			</p>
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="email"
						id="email"
						placeholder="Email Address"
						value={email}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						id="password"
						placeholder="Password"
						minLength="6"
						value={password}
						onChange={handleChange}
					/>
				</div>
				<input
					type="submit"
					value="Login"
					className="btn btn-primary"
				/>
			</form>
			<p className="my-1">
				Don't have an account? <Link to="/register">Sign Up</Link>
			</p>
		</div>
	);
}

export default Login;
