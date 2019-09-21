module.exports = {
	getAllAnimals: (req, res) => {
		const db = req.app.get("db");
		db.allAnimals().then((animal) => res.status(200).send(animal));
	},
	addAnimal: (req, res) => {
		const db = req.app.get("db");
		const { name, breed, description, image } = req.body;
		db.addAnimal([name, breed, description, image]).then((animal) =>
			res.status(200).send(animal)
		);
	},
	removeAnimal: (req, res) => {
		const db = req.app.get("db");
		const { id } = req.params;
		db.removeAnimal(id).then((animal) => {
			res.status(200).send(animal);
		});
	},
	updateAnimal: (req, res) => {
		const db = req.app.get("db");
		const { id } = req.params;
		const { name, breed, description, image } = req.body;
		db.updateAnimal([id, name, breed, description, image]).then((animal) =>
			res.status(200).send(animal)
		);
	}
};
