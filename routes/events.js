const router = require("express").Router();

const { getEventData } = require("../fetchFromAPI");

router.post("/", async (req, res) => {
	const query = req.body.query;

	const eventData = await getEventData(null, `search=${query}`);

	if (!eventData) return res.redirect("/no_results_found");

	res.render("pages/events", {
		title: "SpaceTime",
		data: JSON.stringify(eventData),
		query: query,
	});
});

router.post("/next", async (req, res) => {
	const next = req.body["next-url"];

	console.log(next);

	const eventData = await getEventData(next);

	if (!eventData) return res.redirect("/no_results_found");

	res.render("pages/events", {
		title: "SpaceTime",
		data: JSON.stringify(eventData),
		query: req.body.query,
	});
});

router.post("/previous", async (req, res) => {
	const previous = req.body["previous-url"];

	const eventData = await getEventData(previous);

	if (!eventData) return res.redirect("/no_results_found");

	res.render("pages/events", {
		title: "SpaceTime",
		data: JSON.stringify(eventData),
		query: req.body.query,
	});
});

router.post("/first", async (req, res) => {
	const first = req.body["first-url"];

	const eventData = await getEventData(
		decodeURIComponent(first).replace(/offset=.*/, "")
	);

	if (!eventData) return res.redirect("/no_results_found");

	res.render("pages/events", {
		title: "SpaceTime",
		data: JSON.stringify(eventData),
		query: req.body.query,
	});
});

router.post("/last", async (req, res) => {
	const last = req.body["last-url"];

	const eventData = await getEventData(
		decodeURIComponent(last).replace(
			/offset=.*/,
			`offset=${parseInt(req.body.count) - 3}`
		)
	);

	if (!eventData) return res.redirect("/no_results_found");

	res.render("pages/events", {
		title: "SpaceTime",
		data: JSON.stringify(eventData),
		query: req.body.query,
	});
});

module.exports = {
	path: "/events",
	router,
};
