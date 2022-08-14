import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Profiles from './pages/Profiles';
import Dashbord from './pages/Dashbord';
import Protect from './components/Protect';
import CreateProfile from './pages/CreateProfile';
import EditProfile from './pages/EditProfile';
import AddEducation from './pages/AddEducation';
import AddExperience from './pages/AddExperience';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import Post from './pages/Post';

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profiles" element={<Profiles />} />
				<Route path="/profile/:profileId" element={<Profile />} />
				<Route path="/dashbord" element={<Protect />}>
					<Route path="/dashbord" element={<Dashbord />} />
				</Route>
				<Route path="/create-profile" element={<Protect />}>
					<Route path="/create-profile" element={<CreateProfile />} />
				</Route>
				<Route path="/edit-profile" element={<Protect />}>
					<Route path="/edit-profile" element={<EditProfile />} />
				</Route>
				<Route path="/add-experience" element={<Protect />}>
					<Route path="/add-experience" element={<AddExperience />} />
				</Route>
				<Route path="/add-education" element={<Protect />}>
					<Route path="/add-education" element={<AddEducation />} />
				</Route>
				<Route path="/posts" element={<Protect />}>
					<Route path="/posts" element={<Posts />} />
				</Route>
				<Route path="/post/:postId" element={<Protect />}>
					<Route path="/post/:postId" element={<Post />} />
				</Route>
			</Routes>
			<ToastContainer />
		</Router>
	);
}

export default App;
