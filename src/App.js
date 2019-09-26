import React, { Component } from "react";
import { Route, Link, Switch, withRouter } from "react-router-dom";
import "./app.scss";
import authComponent from "./components/authComponent";
import { connect } from "react-redux";
import { setUser } from "./ducks/reducer";
import axios from "axios";
import { Locations } from "./components/locations";
import Training from "./components/training";
import Adoption from "./components/adoption";
import Volunteer from "./components/volunteer";
import { Donation } from "./components/donation";

class App extends Component {
	componentDidMount() {
		axios.get("/api/animal_data").then((res) => {
			console.log(res.data);
			if (res.data) {
				this.props.setUser(res.data);
			}
		});
	}
	render() {
		console.log(this.props);
		return (
			<div className="App">
				<header>
					<div className="Dogvengers">Dogvengers</div>
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/Locations">Locations</Link>
							</li>
							<li>
								<Link to="/training">Training</Link>
							</li>
							<li>
								<Link to="/adoption">Adoption</Link>
							</li>
							<li>
								<Link to="/donations">Donations</Link>
							</li>
							<li>
								<Link className="test" to="/volunteer">
									Volunteer
								</Link>
							</li>
							<li>
								<button
									onClick={() => {
										axios.post("/api/goodbye").then((res) => {
											console.log("logged out");
											this.props.setUser(null);
											this.props.history.push("/");
										});
									}}
								>
									Logout
								</button>
							</li>
						</ul>
					</nav>
				</header>
				<Switch>
					<Route exact path="/" component={authComponent} />
					{this.props.user && (
						<>
							<Route
								path="/locations"
								render={() => {
									return (
										<div className="background">
											<Locations />
										</div>
									);
								}}
							/>
							<Route
								path="/training"
								render={() => {
									return (
										<div className="background">
											<Training />
										</div>
									);
								}}
							/>
							<Route
								path="/adoption"
								render={() => {
									return (
										<div>
											<Adoption />
										</div>
									);
								}}
							/>
							<Route
								path="/donations"
								render={() => {
									return (
										<div>
											<Donation />
										</div>
									);
								}}
							/>
							<Route
								path="/volunteer"
								render={() => {
									return (
										<div>
											<Volunteer />
										</div>
									);
								}}
							/>
						</>
					)}
				</Switch>
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
const invokedConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default withRouter(invokedConnect(App));
