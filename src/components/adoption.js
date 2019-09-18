import React, { Component } from "react";
import "./adoption.scss";
import axios from "axios";

export default class Adoption extends Component {
	constructor() {
		super();
		this.state = {
			animal: []
		};
	}
	componentDidMount() {
		axios.get("/api/allanimals").then((res) => {
			this.setState({ animal: res.data });
		});
	}
	render() {
		const displayAnimal = this.state.animal.map((dog) => {
			console.log(dog);
			return (
				<div>
					{dog.name}
					<br />
					{dog.breed}
					<br />
					{dog.description}
					<br />
					<img src={dog.image} />
				</div>
			);
		});
		return (
			<div>
				<h1 className="adoption">{displayAnimal}</h1>
			</div>
		);
	}
}
