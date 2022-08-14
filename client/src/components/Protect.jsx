import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStatus from '../Hooks/useAuthStatus';
import Spinner from './Spinner';

function Protect() {
	const { isLoggedIn, isLoading } = useAuthStatus();

	if (isLoading) {
		return <Spinner />;
	}

	return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default Protect;
