import React, { Component } from 'react';
import { logoutUser } from '../../actions/authActions';
import { connect } from 'react-redux';
class Logout extends Component {
	componentDidMount() {
		console.log('Logging user out..?');
		this.props.logoutUser();
		setTimeout(() => {
			this.props.history.replace('/')
		}, 2000);
	}
	render() {
		return <h4 style={{display:'flex', justifyContent:'center'}}> Successfully logged out.</h4>;
	}
}
const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Logout);


