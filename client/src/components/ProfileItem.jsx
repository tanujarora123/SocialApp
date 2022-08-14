import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

function ProfileItem({ profile }) {
	return (
		<div className="profile bg-light">
			<img
				src={`https:${profile.user.avatar}`}
				alt="profileImage"
				className="round-img"
			/>
			<div>
				<h2>{profile.user.name}</h2>
				<p>
					{profile.status} at {profile.company}
				</p>
				<p className="my-1">
					{profile.location && <span>{profile.location}</span>}
				</p>
				<Link
					to={`/profile/${profile.user._id}`}
					className="btn btn-primary"
				>
					View profile
				</Link>
			</div>
			<ul>
				{profile.skills.slice(0, 4).map((skill, ind) => (
					<li className="text-primary" key={ind}>
						<FaCheck />
						{skill}
					</li>
				))}
			</ul>
		</div>
	);
}

export default ProfileItem;
