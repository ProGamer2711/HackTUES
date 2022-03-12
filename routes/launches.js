const router = require("express").Router();

const getData = require("../fetchFromAPI");

router.post("/", async (req, res) => {
	const query = req.body.query;

	const rocketData = await getData(null, `search=${query}`);

	if (!rocketData) return res.redirect("/no_results_found");

	res.render("pages/launches", {
		title: "SpaceTime",
		rocketData: JSON.stringify(rocketData),
	});
});

router.post("/next", async (req, res) => {
	const next = req.body["next-url"];

	const rocketData = await getData(next);

	if (!rocketData) return res.redirect("/no_results_found");

	res.render("pages/launches", {
		title: "SpaceTime",
		rocketData: JSON.stringify(rocketData),
	});
});

router.post("/previous", async (req, res) => {
	const previous = req.body["previous-url"];

	const rocketData = await getData(previous);

	if (!rocketData) return res.redirect("/no_results_found");

	res.render("pages/launches", {
		title: "SpaceTime",
		rocketData: JSON.stringify(rocketData),
	});
});

module.exports = {
	path: "/launches",
	router,
};
