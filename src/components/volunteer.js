import React, { Component } from "react";
import "./volunteer.scss";
import axios from "axios";

export default class Volunteer extends Component {
	constructor() {
		super();
		this.state = {
			app: [],
			app_date: "",
			app_time: "",
			name: "",
			description: "",
			id: 0
		};
	}
	componentDidMount() {
		axios.get("/api/allApp").then((res) => {
			this.setState({ app: res.data });
		});
	}
	addApp = () => {
		axios
			.post("/api/addApp", {
				app_date: this.state.app_date,
				app_time: this.state.app_time,
				name: this.state.name,
				description: this.state.description
			})
			.then((res) => {
				this.setState({
					app: res.data,
					app_date: "",
					app_time: "",
					name: "",
					description: ""
				});
			});
	};
	deleteApp = (id) => {
		axios
			.delete(`/api/deleteApp/${id}`)
			.then((res) => this.setState({ app: res.data }));
	};
	updateApp = (id) => {
		axios
			.put(`/api/updateApp/${id}`, {
				id: this.state.id,
				app_date: this.state.breed,
				app_time: this.state.image,
				name: this.state.name,
				description: this.state.description
			})
			.then((res) => {
				this.setState({
					app: res.data,
					app_date: "",
					app_time: "",
					name: "",
					description: ""
				});
			});
	};

	render() {
		const { app_date, app_time, name, description } = this.state;
		const displayAppointments = this.state.app.map((Apps) => {
			return (
				<div className="appPage">
					<div className="styled">
						{Apps.app_date}
						<br />
						{Apps.app_time}
						<br />
						{Apps.name}
						<br />
						{Apps.description}
					</div>

					<button
						onClick={() => {
							this.deleteApp(Apps.id);
						}}
					>
						Cancel Appointment
					</button>
				</div>
			);
		});
		return (
			<div className="Schedule">
				<div className="inputs">
					<input
						placeholder="Date"
						value={app_date}
						onChange={(e) =>
							this.setState({
								app_date: e.target.value
							})
						}
					/>
					<input
						placeholder="Time"
						value={app_time}
						onChange={(e) =>
							this.setState({
								app_time: e.target.value
							})
						}
					/>
					<input
						placeholder="Name"
						value={name}
						onChange={(e) =>
							this.setState({
								name: e.target.value
							})
						}
					/>
					<input
						placeholder="Description"
						value={description}
						onChange={(e) =>
							this.setState({
								description: e.target.value
							})
						}
					/>
					<button onClick={this.addApp}> Add Appointment</button>
				</div>

				<div className="apps">{displayAppointments}</div>
			</div>
		);
	}
}
