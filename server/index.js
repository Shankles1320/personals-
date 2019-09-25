const express = require("express");
const session = require("express-session");
require("dotenv").config();
const massive = require("massive");
const stripe = require("stripe")("sk_test_7eOdF72wBiOYbW5Z2bbIAjJ000yQBjxHk3");
const uuid = require("uuid/v4");
const cors = require("cors");

const {
	register,
	login,
	logout,
	userSession,
	getAllAnimals
} = require("./authCon");
const app = express();
const { SESSION_SECRET, CONNECTION_STRING } = process.env;
app.use(express.json());
app.use(cors());
const adoptionController = require("./adoptionController");
const SchedulingController = require("./schedulingController");
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxage: 1000 * 60 * 60 * 24 * 14
		}
	})
);

massive(CONNECTION_STRING).then((db) => {
	console.log("db online");
	app.set("db", db);
});
//login endpoints
app.post("/api/welcome", login);
app.post("/api/registration", register);
app.post("/api/goodbye", logout);
app.get("/api/animal_data", userSession);

//animal endpoints

app.get("/api/allanimals", adoptionController.getAllAnimals);
app.post("/api/addAnimal", adoptionController.addAnimal);
app.put("/api/updateAnimal/:id", adoptionController.updateAnimal);
app.delete("/api/removeAnimal/:id", adoptionController.removeAnimal);

//scheduling endpoints

app.get("/api/allApp", SchedulingController.allApp);
app.post("/api/addApp", SchedulingController.addApp);
app.put("/api/updateApp/:id", SchedulingController.updateApp);
app.delete("/api/deleteApp/:id", SchedulingController.deleteApp);

//randomizer endpoint
app.get("/api/random", getAllAnimals);

//stripe endpoint
app.get("/api/payment", (req, res) => {
	res.send(stripe);
});
app.post("/api/checkout", async (req, res) => {
	console.log("request", req.body);

	let error;
	let status;
	try {
		const { bowls, beds, food, toys, token } = req.body;
		// console.log("this is the token: ", token)
		// console.log(bowls, beds, food, toys);
		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id
		});

		const idempotency_key = uuid();
		const charge = await stripe.charges.create(
			{
				amount: bowls.price * 100,
				currency: "usd",
				customer: customer.id,
				receipt_email: token.email,
				description: `Donated a ${bowls.name}`
			},
			{
				amount: beds.price * 100,
				currency: "usd",
				customer: customer.id,
				receipt_email: token.email,
				description: `Donated a ${beds.name}`
			},
			{
				amount: food.price * 100,
				currency: "usd",
				customer: customer.id,
				receipt_email: token.email,
				description: `Donated a ${food.name}`
			},
			{
				amount: toys.price * 100,
				currency: "usd",
				customer: customer.id,
				receipt_email: token.email,
				description: `Donated a ${toys.name}`
			},

			{
				idempotency_key
			}
		);
		console.log("Charge:", { charge });
		status = "success";
	} catch (error) {
		console.error("Error:", error);
		status = "failure";
	}

	res.json({ error, status });
});

const port = 4000;

app.listen(port, () => console.log(`Gettin SCHWIFTY on ${port}`));
