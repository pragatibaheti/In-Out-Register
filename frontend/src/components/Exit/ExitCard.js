import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios, { post } from 'axios';
import './ExitCard.css';

const ExitCard = ({updateLoginState}) => {
	const [inputs, changeInputs] = useState({ id: ''});
	const [daeta, setData] = useState({
		data: null,
		error: null,
		loading: false,
	});
	const { data, error, loading } = daeta;
	const [errorMsg, setErrorMsg] = useState('');
	const handleInput = ( event ) => {
		const value = event.target.value;
		const name = event.target.name;
		changeInputs({ 
			...inputs,
			[name]: value
		});
	}
	const handleSubmit = ( event ) => {
		event.preventDefault();
		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		const body = {
			id: inputs.id,
		}
		console.log( body)
		post('http://localhost:3000/api/out',{
			body,
			config
		})
	}

	if ( error ) {
		if(error.graphQLErrors.length > 0 && error.graphQLErrors[0].extensions.code === "UNAUTHENTICATED")
			setErrorMsg('Invalid email or password.');
		else
			setErrorMsg('Something went wrong.');
	}
	return (
		<div className='loginCard'>
			<h3>Thanks for your visit</h3>
			<p>Hope you had a nice meeting</p>
			<form className='loginForm' onSubmit={handleSubmit}>
				{ errorMsg !== '' &&
					<div className="errorMsg">{errorMsg}</div>
				}
				<input type="Text" name="id" placeholder="Enter Your Id"  onChange={handleInput} required />
				<input type='submit' name='login' value='Check OUT' disabled={loading} />
			</form>
		</div>
	)
}

export default ExitCard;