import React from 'react';
import AuthUserContext from './context'

const withAuthentication = Component => {
	class WithAuthentication extends React.Component {
		constructor(props){
			super(props);

			this.changeUser = (identity) => {
				this.setState({authUser: identity});
			};

			this.state = {
				authUser: null,
				changeUser: this.changeUser,
			};
		}

		render() {
			return(
				<AuthUserContext.Provider value={this.state}>
					<Component {...this.props} />
				</AuthUserContext.Provider>
				);
		}
	}

	return WithAuthentication;
};
 
export default withAuthentication;