import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaBlackTie, FaGraduationCap } from 'react-icons/fa';

function DashActions() {
	return (
		<div className="dash-buttons">
			<Link to="/edit-profile" className="btn">
				<FaUserCircle className="text-primary" /> Edit Profile
			</Link>
			<Link to="/add-experience" className="btn">
				<FaBlackTie className="text-primary" /> Add Experience
			</Link>
			<Link to="/add-education" className="btn">
				<FaGraduationCap className="text-primary" /> Add Education
			</Link>
		</div>
	);
}

export default DashActions;
