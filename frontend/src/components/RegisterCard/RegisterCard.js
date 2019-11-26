import React, { useState } from 'react';
import './RegisterCard.css';
import axios, { post } from 'axios';
const RegisterCard = () => {
	const [inputs, changeInputs] = useState({visitorname: '', 
											visitorphoneno: '',
											visitoremail: '',
											hostname:'',
											hostphoneno:'',
											hostemail:'',
											checkouttime:''});
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
		const body = {visitorname: inputs.visitorname, 
		visitorphoneno: inputs.visitorphoneno,
		visitoremail: inputs.visitoremail,
		hostname:inputs.hostname,
		hostphoneno:inputs.hostphoneno,
		hostemail:inputs.hostemail,
		checkouttime:inputs.checkouttime}
		console.log( body)
		post('http://localhost:3000/api/out',{
			body,
			config
		})
	}
	return (
		<div className='registerCard'>
			<h3>Hey Visitor!</h3>
			<p>Help us to maintain our data</p>
			<form className='registerForm' onSubmit={handleSubmit}>
				{ errorMsg !== '' &&
					<div className="errorMsg">{errorMsg}</div>
				}
				<input type="text" name = "visitorname" placeholder="Your Name"  onChange={handleInput}/>
				<input type="email" name = "visitoremail" placeholder="Your Email" onChange={handleInput} />
				<input type="Number" name = "visitorphoneno" placeholder="Host Number" onChange={handleInput}/>
				<input type="text" name = "hostname" placeholder="Host Name" onChange={handleInput}/>
				<input type="email" name = "hostemail" placeholder="Host Email" onChange={handleInput} />
				<input type="Number" name = "hostphoneno" placeholder="Host Number" onChange={handleInput}/>
				<strong>EXPECTED CHECK OUT TIME:</strong>
				<input type="time" name = "checkouttime" placeholder="checkouttime" onChange={handleInput} />
				<input type='submit' name='signup' value='Add In Time' disabled={ loading } />
			</form>
		</div>
	)
}

export default RegisterCard;