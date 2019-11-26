import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginCard from '../../components/LoginCard/LoginCard';
import RegisterCard from '../../components/RegisterCard/RegisterCard';
import ExitCard from '../../components/Exit/ExitCard';
import './LogReg.css';


const LogReg = ({updateLoginState}) => {
	if(window.localStorage.getItem('token')){
		window.localStorage.clear();
		return <Redirect to='/dashboard' />
	}
	return (
		<section className='loginSection'>
			<div className='login-left'>
				<h2>IN-OUT REGISTER</h2>
			</div>
			<div className="triangle-right"></div>
			<div className='login-right'>
				<Switch>
					<Route path="/update" exact render={ () => 
						<LoginCard updateLoginState={updateLoginState} />}
					/>
					<Route path="/" exact render={ () => 
						<RegisterCard />}
					/>
					<Route path="/reset" exact render={ () => 
						<ExitCard />}
					/>
				</Switch>
			</div>
		</section>
	);
}

export default LogReg;