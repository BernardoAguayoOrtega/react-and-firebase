import React, { useEffect, useState } from 'react';
import { useSession } from '../firebase/UserProvider';
import { firestore } from '../firebase/config';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Profile = () => {
	const { user } = useSession();
	const [userDocument, setUserDocument] = useState(undefined);
	const { id } = useParams();
	const { register, setValue } = useForm;

	useEffect(() => {		
		const docRef = firestore.collection('users').doc(id);

		const unsubscribe = docRef.onSnapshot((document) => {
			if (document.exists) {
				setUserDocument(document.data());
			}
		});

		return unsubscribe;
	}, [id]);

	if (!userDocument) return null;

	return (
		<>
			<div
				className='add-form-container'
				style={{ maxWidth: 960, margin: '50px auto' }}>
				<form className='ui big form'>
					<div className='fields'>
						<div className='eight wide field'>
							<label>
								Name
								<input ref={register} type='text' name='name' />
							</label>
						</div>
						<div className='eight wide field'>
							<label>
								Email
								<input ref={register} type='text' name='email' disabled />
							</label>
						</div>
					</div>
					<div className='fields'>
						<div className='six wide field'>
							<label>
								Address
								<input ref={register} type='text' name='address' />
							</label>
						</div>
						<div className='five wide field'>
							<label>
								City
								<input ref={register} type='text' name='city' />
							</label>
						</div>
						<div className='two wide field'>
							<label>
								State
								<input ref={register} type='text' name='state' />
							</label>
						</div>
						<div className='three wide field'>
							<label>
								Zip
								<input ref={register} type='text' name='zip' />
							</label>
						</div>
					</div>
					<div className='equal width fields'>
						<div className='field'>
							<label>
								Phone
								<input ref={register} type='text' name='phone' />
							</label>
						</div>
						<div className='field'>
							<label>
								Specialty
								<select className='specialty' name='specialty'>
									<option value='field agent'>Field Agent</option>
									<option value='covert operations'>Covert Operations</option>
									<option value='intelligence officer'>
										Intelligence Officer
									</option>
								</select>
							</label>
						</div>
						<div className='field'>
							<label>
								ip
								<input ref={register} type='text' name='ip' />
							</label>
						</div>
					</div>
					<button
						type='submit'
						className='ui submit large grey button right floated'>
						Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default Profile;
