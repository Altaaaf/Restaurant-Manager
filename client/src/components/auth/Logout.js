import React, { Component } from 'react';
import { logoutUser } from '../../actions/authActions';
import { connect } from 'react-redux';
class Logout extends Component {
	componentDidMount() {
		console.log('Logging user out..?');
		this.props.logoutUser();
	}
	render() {
		return <h3> Successfully logged out.</h3>;
	}
}
const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Logout);
