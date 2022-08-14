import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCode, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { clearProfile } from '../features/profile/profileSlice';
import { clearPost } from '../features/post/postSlice';

function Navbar() {
	const { user } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		dispatch(clearProfile());
		dispatch(clearPost());
		navigate('/');
	};

	const guestLinks = (
		<ul>
			<li>
				<Link to="/profiles">Developers</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);

	const authLink = (
		<ul>
			<li>
				<Link to="/posts">Posts</Link>
			</li>
			<li>
				<Link to="/profiles">Developers</Link>
			</li>
			<li>
				<Link to="/login" onClick={handleLogout}>
					<FaSignOutAlt /> <span className="hide-sm"> Logout</span>
				</Link>
			</li>
			{/* <li>
				<button onClick={handleLogout} className="logout">
					<FaSignOutAlt /> <span className="hide-sm"> Logout</span>
				</button>
			</li> */}
			<li>
				<Link to="/dashbord">
					<FaUser /> <span className="hide-sm">Dashbord</span>
				</Link>
			</li>
		</ul>
	);

	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
					<FaCode /> DevConnector
				</Link>
			</h1>
			{user ? authLink : guestLinks}
		</nav>
	);
}

export default Navbar;
