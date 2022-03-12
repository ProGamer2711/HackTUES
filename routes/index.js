const router = require("express").Router();

const { getLaunchData } = require("../fetchFromAPI");

router.get("/", async (_, res) => {
	const rocketData = await getLaunchData(
		"https://lldev.thespacedevs.com/2.2.0/launch/upcoming?mode=list&limit=3"
	);

	res.render("pages/index", {
		title: "SpaceTime",
		data: JSON.stringify(rocketData),
		query: "",
	});
});

router.post("/next", async (req, res) => {
	const next = req.body["next-url"];

	const rocketData = await getLaunchData(next);

	if (!rocketData) return res.redirect("/no_results_found");

	res.render("pages/index", {
		title: "SpaceTime",
		data: JSON.stringify(rocketData),
		query: req.body.query,
	});
});

router.post("/previous", async (req, res) => {
	const previous = req.body["previous-url"];

	const rocketData = await getLaunchData(previous);

	if (!rocketData) return res.redirect("/no_results_found");

	res.render("pages/index", {
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

	res.render("pages/index", {
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

	res.render("pages/index", {
		title: "SpaceTime",
		data: JSON.stringify(rocketData),
		query: req.body.query,
	});
});

module.exports = {
	path: "/",
	router,
};
