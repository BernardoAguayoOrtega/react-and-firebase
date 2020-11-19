import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
	const [session, setSession] = React.useState({
		user: undefined,
		loading: true,
	});

	React.useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			setSession({ user, loading: true });
		});

		return () => unsubscribe();
	}, []);

	return (
		<UserContext.Provider value={session}>{children}</UserContext.Provider>
	);
};

export const useSession = () => {
	const session = React.useContext(UserContext);
	return session;
};
