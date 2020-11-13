import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'muicss/lib/react/container';

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
 
const SignInPage = () => (
	<Container>
		<h1>Но сначала..</h1>
		<AuthUserContext.Consumer>
		{({authUser, changeUser}) => 
			<SignInForm changeUser={changeUser}/>
		}
		</AuthUserContext.Consumer>
	</Container>
);

const INITIAL_STATE = {
  identity: "",
  age: 0,
  error: null,
};

class SignInFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		const { identity, age} = this.state;
			this.setState({ ...INITIAL_STATE });
			this.props.changeUser({identity,age});
			this.props.history.push(ROUTES.HOME);
			//this.setState({error: "try again"});

		event.preventDefault();
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { error } = this.state;
		return (
			<Form onSubmit={this.onSubmit}>
        <legend>Чем ты отличаешься от остальных)?</legend>
        <Input 
        	label="Имя-фамилия"
        	placeholder="Вася Петров"
        	name="identity"
        	type="text"
        	onChange={this.onChange}
        	required
        />
        <Input
        	label="Возраст"
        	placeholder="18"
        	name="age"
        	type="number"
        	min="7" max="80"
        	onChange={this.onChange}
        	required
        />
        <Button
        	variant="raised"
        	type="submit"
        >
        	Дальше
        </Button>
      {error}
      </Form>
		);
	}
}
 
const SignInForm = withRouter(SignInFormBase);
 
export default SignInPage;
 
export { SignInForm };