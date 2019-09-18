import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../ducks/reducer";
import "./authComponent.scss";

class AuthComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			username: "",
			register: true
		};
	}

	async register() {
		const { email, password, username } = this.state;
		const regUser = await axios.post("/api/registration", {
			email,
			username,
			password
		});
		console.log(regUser);

		this.props.setUser(regUser.data);
	}
	async login() {
		const { email, password } = this.state;
		const logUser = await axios.post("/api/welcome", {
			email,
			password
		});
		this.props.setUser(logUser.data);
	}

	render() {
		console.log(this.props.user);
		const { email, username, password, register } = this.state;
		return (
			<div>
				{
					<form
						onSubmit={(e) => {
							e.preventDefault();
							if (this.state.register) {
								this.register();
							} else {
								this.login();
							}
						}}
					>
						<button onClick={() => this.setState({ register: true })}>
							Register
						</button>
						<button onClick={() => this.setState({ register: false })}>
							Login
						</button>
						<input
							placeholder="Email"
							value={email}
							onChange={(e) =>
								this.setState({
									email: e.target.value
								})
							}
						/>
						{/* <input
							placeholder="Username"
							value={username}
							onChange={(e) =>
								this.setState({
									username: e.target.value
								})
							}
						/> */}
						<input
							placeholder="password"
							value={password}
							onChange={(e) =>
								this.setState({
									password: e.target.value
								})
							}
						/>
						{register && (
							<input
								placeholder="username"
								value={username}
								onChange={(e) =>
									this.setState({
										username: e.target.value
									})
								}
							/>
						)}
						<button>{register ? "register" : "Login"}</button>
					</form>
				}
				<div></div>
			</div>
		);
	}
}

function mapStateToProps(reduxState) {
	return reduxState;
}
const mapDispatchToProps = {
	setUser
};
const authEnhanchingFunction = connect(
	mapStateToProps,
	mapDispatchToProps
);
export default authEnhanchingFunction(AuthComponent);
