import React from 'react';
import { Link } from 'react-router-dom';

function RepoItem({ repo }) {
	return (
		<div className="repo bg-white my-1 p-1">
			<div>
				<h4>
					<a
						href={repo.html_url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{repo.name}
					</a>
				</h4>
				<p>
					{repo.description
						? repo.description
						: 'No available decription'}
				</p>
			</div>

			<div>
				<ul>
					<li className="badge badge-primary">
						Stars: {repo.stargazers_count}
					</li>
					<li className="badge badge-dark">
						Watchers: {repo.watchers_count}
					</li>
					<li className="badge badge-light">
						Forks: {repo.forks_count}
					</li>
				</ul>
			</div>
		</div>
	);
}

export default RepoItem;
