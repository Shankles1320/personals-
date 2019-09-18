module.exports = {
	getAllAnimals: (req, res) => {
		const db = req.app.get("db");
		db.allAnimals().then((animal) => res.status(200).send(animal));
	}
};
