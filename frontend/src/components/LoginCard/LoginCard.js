import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios, { post } from 'axios';
import './LoginCard.css';

const LoginCard = ({updateLoginState}) => {
	const [inputs, changeInputs] = useState({ id: '', checkouttime: '' });
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
			checkouttime: inputs.checkouttime
		}
		console.log( body)
		post('http://localhost:3000/api/update',{
			body,
			config
		})

	}

	return (
		<div className='loginCard'>
			<h3>Welcome back!</h3>
			<p>Want to extend your checkout time</p>
			<form className='loginForm' onSubmit={handleSubmit}>
				{ errorMsg !== '' &&
					<div className="errorMsg">{errorMsg}</div>
				}
				<input type="Text" placeholder="Enter Your Id" name = "id"  onChange={handleInput} required />
				<strong>UPDATED CHECK OUT TIME:</strong>
				<input type="time" name = "checkouttime" placeholder="checkouttime" onChange={handleInput} />
				<input type='submit' name='login' value='Update' disabled={loading} />
			</form>
			<Link to='/reset'>Meeting over?</Link>
		</div>
	)
}

export default LoginCard;