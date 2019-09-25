import React from "react";
import "./donations.scss";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

toast.configure();

export function Donation() {
	const [bowls] = React.useState({
		name: "Bowls",
		price: 5.0,
		description: "Food and water bowls"
	});
	const [beds] = React.useState({
		name: "Beds",
		price: 15.0,
		description: "Bedding"
	});
	const [food] = React.useState({
		name: "Pet Food",
		price: 20.0,
		description: "Dog or Cat Food"
	});
	const [toys] = React.useState({
		name: "Pet Toys",
		price: 8.0,
		description: "Toys for the animals to play with"
	});

	async function handleToken(bowls, beds, food, toys, token) {
		const response = await axios.post("/api/checkout", {
			bowls,
			beds,
			food,
			toys,
			token
		});
		const { status } = response.data;
		console.log("Response:", response.data);
		if (status === "success") {
			toast("Success! Thank you for your donation!", { type: "success" });
		} else {
			toast("Something went wrong", { type: "error" });
		}
	}

	return (
		<div className="container">
			<h1>{bowls.name}</h1>
			<h3> {bowls.price}</h3>
			<StripeCheckout
				stripeKey="pk_test_SIgrvHNLotnOaiDOi8H19to500Q4gOb6A8"
				token={handleToken}
				amount={bowls.price * 100}
				name={bowls.name}
			/>
			<br />
			<h1>{beds.name}</h1>
			<h3> {beds.price}</h3>
			<StripeCheckout
				stripeKey="pk_test_SIgrvHNLotnOaiDOi8H19to500Q4gOb6A8"
				token={handleToken}
				amount={beds.price * 100}
				name={beds.name}
			/>
			<br />
			<h1>{food.name}</h1>
			<h3> {food.price}</h3>
			<StripeCheckout
				stripeKey="pk_test_SIgrvHNLotnOaiDOi8H19to500Q4gOb6A8"
				token={handleToken}
				amount={food.price * 100}
				name={food.name}
			/>
			<br />
			<h1>{toys.name}</h1>
			<h3> {toys.price}</h3>
			<StripeCheckout
				stripeKey="pk_test_SIgrvHNLotnOaiDOi8H19to500Q4gOb6A8"
				token={handleToken}
				amount={toys.price * 100}
				name={toys.name}
			/>
		</div>
	);
}
