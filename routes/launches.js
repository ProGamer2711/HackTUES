const router = require("express").Router();

const { getLaunchData } = require("../fetchFromAPI");

router.post("/", async (req, res) => {
	const query = req.body.query;

	const rocketData = await getLaunchData(null, `search=${query}`);

	if (!rocketData) return res.redirect("/no_results_found");

	res.render("pages/launches", {
		title: "SpaceTime",
		data: JSON.stringify(rocketData),
		query,
	});
});

router.post("/next", async (req, res) => {
	const next = req.body["next-url"];

	const rocketData = await getLaunchData(next);

	if (!rocketData) return res.redirect("/no_results_found");

	res.render("pages/launches", {
		title: "SpaceTime",
		data: JSON.stringify(rocketData),
		query: req.body.query,
	});
});

router.post("/previous", async (req, res) => {
	const previous = req.body["previous-url"];

	const rocketData = await getLaunchData(previous);

	if (!rocketData) return res.redirect("/no_results_found");

	res.render("pages/launches", {
		title: "SpaceTime",
		data: JSON.stringify(rocketData),
		query: req.body.query,
	});
});

router.post("/first", async (req, res) => {
	const first = req.body["first-url"];

	const rocketData = await getLaunchData(
		decodeURIComponent(first).replace(/offset=.*/, "")
	);

	if (!rocketData) return res.redirect("/no_results_found");

	res.render("pages/launches", {
		title: "SpaceTime",
		data: JSON.stringify(rocketData),
		query: req.body.query,
	});
});

router.post("/last", async (req, res) => {
	const last = req.body["last-url"];

	const rocketData = await getLaunchData(
		decodeURIComponent(last).replace(
			/offset=.*/,
			`offset=${parseInt(req.body.count) - 3}`
		)
	);

	if (!rocketData) return res.redirect("/no_results_found");

	res.render("pages/launches", {
		title: "SpaceTime",
		data: JSON.stringify(rocketData),
		query: req.body.query,
	});
});

module.exports = {
	path: "/launches",
	router,
};
