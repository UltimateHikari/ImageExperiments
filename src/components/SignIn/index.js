import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'muicss/lib/react/container';


import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
 
const SignInPage = () => (
	<Container>
		<h1>SignIn</h1>
		<AuthUserContext.Consumer>
		{({authUser, changeUser}) => 
			<SignInForm changeUser={changeUser}/>
		}
		</AuthUserContext.Consumer>
	</Container>
);

const INITIAL_STATE = {
  identity:'',
  error: null,
};
 
class SignInFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		const { identity } = this.state;
		let age = Number(identity);
		if(identity === 'admin' || (age > 0 && Number.isInteger(age))){
			this.setState({ ...INITIAL_STATE });
			this.props.changeUser(age);
			this.props.history.push(ROUTES.HOME);
		}else{
			alert("lol");
			this.setState({error: "try again"});
		}

		event.preventDefault();
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { identity, error } = this.state;
		const isInvalid = identity === '';
		return (
			<form onSubmit={this.onSubmit}>
				<input
					name="identity"
					value={identity}
					onChange={this.onChange}
					type="text"
					placeholder="Identity"
				/>
				<button disabled={isInvalid} type="submit">
					Sign In
				</button>

				{error && <p>{error.message}</p>}
			</form>
		);
	}
}
 
const SignInForm = withRouter(SignInFormBase);
 
export default SignInPage;
 
export { SignInForm };