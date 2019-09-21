module.exports = {
	allApp: (req, res) => {
		const db = req.app.get("db");
		db.scheduleing
			.allApp()
			.then((appointment) => res.status(200).send(appointment));
	},
	addApp: (req, res) => {
		const db = req.app.get("db");
		const { app_date, app_time, name, description } = req.body;
		db.scheduleing
			.addApp([app_date, app_time, name, description])
			.then((appointment) => res.status(200).send(appointment));
	},
	deleteApp: (req, res) => {
		const db = req.app.get("db");
		const { id } = req.params;
		db.scheduleing.deleteApp(id).then((appointment) => {
			res.status(200).send(appointment);
		});
	},
	updateApp: (req, res) => {
		const db = req.app.get("db");
		const { id } = req.params;
		const { app_date, app_time, name, description } = req.body;
		db.scheduleing
			.updateApp([id, app_date, app_time, name, description])
			.then((appointment) => res.status(200).send(appointment));
	}
};
