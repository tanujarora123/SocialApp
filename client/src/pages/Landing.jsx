import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Landing() {
	const { user } = useSelector(state => state.auth);

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/dashbord');
		}
	}, [user, navigate]);

	return (
		<section className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1 className="x-large">Developer Connector</h1>
					<p className="lead">
						Create a develper portfolio/profile, share posts and get
						help form other developers
					</p>
					<div className="buttons">
						<Link to="/register" className="btn btn-primary">
							SignUp
						</Link>
						<Link to="/login" className="btn btn-light">
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Landing;
