const express = require("express");
const session = require("express-session");
require("dotenv").config();
const massive = require("massive");
const { register, login, logout, userSession } = require("./authCon");
const app = express();
const { SESSION_SECRET, CONNECTION_STRING } = process.env;
app.use(express.json());
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

app.post("/api/welcome", login);
app.post("/api/registration", register);
app.post("/api/goodbye", logout);
app.get("/api/animal_data", userSession);

const port = 4000;

app.listen(port, () => console.log(`Gettin SCHWIFTY on ${port}`));
