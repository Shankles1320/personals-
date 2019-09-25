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
			register: true,
			animal: [],
			name: "",
			breed: "",
			image: ""
		};
	}

	async register() {
		const { email, password, username } = this.state;
		const regUser = await axios.post("/api/registration", {
			email,
			username,
			password
		});
		// console.log(regUser);

		this.props.setUser(regUser.data);
	}
	async login() {
		const { email, password } = this.state;
		const logUser = await axios.post("/api/welcome", {
			email,
			password
		});
		this.props.setUser(logUser.data);
		console.log("hello", logUser);
		if (logUser.data.email !== "") {
			this.props.history.push("/adoption");
		}
	}

	componentDidMount = () => {
		axios.get("/api/random").then((res) => {
			const animals = res.data;
			animals.sort(function() {
				return 0.5 - Math.random();
			});
			this.setState({ animal: animals.slice(0, 3) });
		});
	};

	// this.props.history.push    pushs you to another page after login

	render() {
		// console.log(this.props.user);

		const { email, username, password, register } = this.state;

		const displayAnimal = this.state.animal.map((dog) => {
			return (
				<div className="text">
					{dog.name}
					<br />
					{dog.breed}
					<br />

					<img src={dog.image} />
				</div>
			);
		});

		return (
			<div className="Login">
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
				<br />
				<br />

				<div className="random">{displayAnimal}</div>
			</div>
		);
	}
} // end of class

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
