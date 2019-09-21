const express = require("express");
const session = require("express-session");
require("dotenv").config();
const massive = require("massive");
const { register, login, logout, userSession } = require("./authCon");
const app = express();
const { SESSION_SECRET, CONNECTION_STRING } = process.env;
app.use(express.json());
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

const port = 4000;

app.listen(port, () => console.log(`Gettin SCHWIFTY on ${port}`));
