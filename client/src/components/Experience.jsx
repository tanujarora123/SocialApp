import React from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { deleteExperience } from '../features/profile/profileSlice';

function Experience({ experience }) {
	const dispatch = useDispatch();

	const handleDelete = id => {
		dispatch(deleteExperience(id));
	};

	const experiences = experience.map(exp => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td>{exp.title}</td>
			<td>
				<Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
				{exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : `Now`}
			</td>
			<td>
				<button
					className="btn btn-danger"
					onClick={() => handleDelete(exp._id)}
				>
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<>
			<h2 className="my-2">Experience Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th className="hide-sm">Title</th>
						<th className="hide-sm">Years</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</>
	);
}

export default Experience;
