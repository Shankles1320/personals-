import React, { Component } from "react";
import "./adoption.scss";
import axios from "axios";

export default class Adoption extends Component {
	constructor() {
		super();
		this.state = {
			animal: [],
			name: "",
			breed: "",
			description: "",
			image: "",
			id: 0
		};
	}
	componentDidMount() {
		axios.get("/api/allanimals").then((res) => {
			this.setState({ animal: res.data });
		});
	}
	addAnimal = () => {
		axios
			.post("/api/addAnimal", {
				name: this.state.name,
				breed: this.state.breed,
				description: this.state.description,
				image: this.state.image
			})
			.then((res) => {
				this.setState({
					animal: res.data,
					name: "",
					breed: "",
					description: "",
					image: ""
				});
			});
	};
	removeAnimal = (id) => {
		axios
			.delete(`/api/removeAnimal/${id}`)
			.then((res) => this.setState({ animal: res.data }));
	};
	updateAnimal = (id) => {
		axios
			.put(`/api/updateAnimal/${id}`, {
				id: this.state.id,
				name: this.state.name,
				breed: this.state.breed,
				description: this.state.description,
				image: this.state.image
			})
			.then((res) => {
				this.setState({
					animal: res.data,
					name: "",
					breed: "",
					description: "",
					image: ""
				});
			});
	};
	render() {
		const { name, breed, description, image } = this.state;
		const displayAnimal = this.state.animal.map((dog) => {
			return (
				<div>
					<div className="info">
						{dog.name}
						<br />
						{dog.breed}
						<br />
						{dog.description}
						<br />
					</div>
					<img className="photo" src={dog.image} />

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
						placeholder="Breed"
						value={breed}
						onChange={(e) =>
							this.setState({
								breed: e.target.value
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
					<input
						placeholder="image"
						value={image}
						onChange={(e) =>
							this.setState({
								image: e.target.value
							})
						}
					/>
					<button
						onClick={() => {
							this.updateAnimal(dog.id);
						}}
					>
						{" "}
						Update Information
					</button>
					<br />

					<button
						onClick={() => {
							this.removeAnimal(dog.id);
						}}
					>
						Adopted!
					</button>
				</div>
			);
		});
		return (
			<div className="adoption">
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
					placeholder="Breed"
					value={breed}
					onChange={(e) =>
						this.setState({
							breed: e.target.value
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
				<input
					placeholder="image"
					value={image}
					onChange={(e) =>
						this.setState({
							image: e.target.value
						})
					}
				/>
				<button onClick={this.addAnimal}> Add an Animal</button>

				<h1 className="adoption">{displayAnimal}</h1>
			</div>
		);
	}
}
