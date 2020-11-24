import React, { useEffect, useState } from 'react';
import { useSession } from '../firebase/UserProvider';
import { firestore } from '../firebase/config';

const Profile = () => {
	const { user } = useSession();
	const [userDocument, setUserDocument] = useState(undefined);

	console.log(userDocument);

	useEffect(() => {
		const docRef = firestore.collection('users').doc(user.uid);

		const unsubscribe = docRef.onSnapshot((document) => {
			if (document.exists) {
				setUserDocument(document.data());
			}
		});

		return unsubscribe;
	}, [user.uid]);

	if (!userDocument) return null;

	return (
		<div>
			<p>Name: {user.displayName}</p>
			<p>Email: {user.email}</p>
			<p>ID: {user.uid}</p>
		</div>
	);
};

export default Profile;
