import React from 'react';
import { logOut } from './firebase/auth';
import { useHistory } from 'react-router-dom';
import { useSession } from './firebase/UserProvider';

function Header() {
	const { user } = useSession();
	const history = useHistory();

	console.log(user);

	const logoutUser = async () => {
		await logOut();
		history.push('/signup');
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
