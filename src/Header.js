import React from 'react';
import { logout } from './firebase/auth';
import { useHistory } from 'react-router-dom';
import { useSession } from './firebase/UserProvider';

function Header() {
	const { user } = useSession();
	const history = useHistory();

	const logoutUser = async () => {
		await logout();
		history.push('/login');
	};

	return (
		<header>
			<h2>The Grid</h2>
			{user && (
				<button className='ui secondary button logout' onClick={logoutUser}>
					LOGOUT
				</button>
			)}
		</header>
	);
}

export default Header;
