/* Static dependencies */
import "../login.html";
import logo from "../images/venyoo_logo.png";

/* JS dependencies */
import React from "react";
import Cookies from "js-cookie";

class LoginForm extends React.Component {
	constructor (...args) {
		super(...args);

		Cookies.remove("login");

		this.state = {
			username: "",
			password: ""
		};
	}

	render () {
		var messageContent = null;

		if (this.state.isInvalid) {
			messageContent = <div className="alert alert-warning" role="alert">Credentials you entered are invalid</div>;
		}

		return (
			<form className="form-signin" onSubmit={this.onSigninSubmit.bind(this)}>
				<img src={logo} />
				{/* <h2 className="form-signin-heading">Please sign in</h2> */}
				{ messageContent }
				<label for="inputUsername" className="sr-only">Username</label>
				<input type="username" id="inputUsername" className="form-control" value={this.state.username} onChange={this.onUsernameChange.bind(this)} placeholder="Username address" required autofocus />
				<label for="inputPassword" className="sr-only">Password</label>
				<input type="password" id="inputPassword" className="form-control" value={this.state.password} onChange={this.onPasswordChange.bind(this)} placeholder="Password" />
				{/*<div className="checkbox">
					<label>
						<input type="checkbox" value="remember-me"> Remember me
					</label>
				</div>*/}
				<button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
			</form>
		);
	}

	onUsernameChange (e) {
		this.setState({
			username:  e.target.value,
			isInvalid: false
		});
	}
	onPasswordChange (e) {
		this.setState({
			password:  e.target.value,
			isInvalid: false
		});
	}
	onSigninSubmit (e) {
		if (this.state.username === "admin" && this.state.password === "nimda") {
			Cookies.set("login", "done");
			window.location.href = "app.html";
		} else {
			this.setState({
				isInvalid: true
			});
		}
		return false;
	}
}

React.render(<LoginForm />, document.getElementById("main"));