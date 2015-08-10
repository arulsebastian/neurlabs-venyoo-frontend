/* Static dependencies */
import "../login.html";
import logo from "../images/venyoo_logo.png";

/* JS dependencies */
import React from "react";

class LoginForm extends React.Component {
	constructor (...args) {
		super(...args);

		this.state = {
			username: "",
			password: ""
		};
	}

	render () {
		return (
			<form className="form-signin">
				<img src={logo} />
				{/* <h2 className="form-signin-heading">Please sign in</h2> */}
				<label for="inputUsername" className="sr-only">Username address</label>
				<input type="username" id="inputUsername" className="form-control" value={this.state.username} onChange={this.onUsernameChange.bind(this)} placeholder="Username address" required autofocus />
				<label for="inputPassword" className="sr-only">Password</label>
				<input type="password" id="inputPassword" className="form-control" value={this.state.password} onChange={this.onPasswordChange.bind(this)} placeholder="Password" required />
				{/*<div className="checkbox">
					<label>
						<input type="checkbox" value="remember-me"> Remember me
					</label>
				</div>*/}
				<button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onSigninClick.bind(this)}>Sign in</button>
			</form>
		);
	}

	onUsernameChange (e) {
		this.setState({
			username: e.target.value
		});
	}
	onPasswordChange (e) {
		this.setState({
			password: e.target.value
		});
	}
	onSigninClick (e) {
		window.location.href = "app.html";
	}
}

React.render(<LoginForm />, document.getElementById("main"));