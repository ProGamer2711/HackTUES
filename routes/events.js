const router = require("express").Router();

const { getEventData } = require("../fetchFromAPI");

router.post("/", async (req, res) => {
	const query = req.body.query;

	const eventData = await getEventData(null, `search=${query}`);

	if (!eventData) return res.redirect("/no_results_found");

	res.render("pages/events", {
		title: "SpaceTime",
		data: JSON.stringify(eventData),
	});
});

router.post("/next", async (req, res) => {
	const next = req.body["next-url"];

	const eventData = await getEventData(next);

	if (!eventData) return res.redirect("/no_results_found");

	res.render("pages/events", {
		title: "SpaceTime",
		data: JSON.stringify(eventData),
	});
});

router.post("/previous", async (req, res) => {
	const previous = req.body["previous-url"];

	const eventData = await getEventData(previous);

	if (!eventData) return res.redirect("/no_results_found");

	res.render("pages/events", {
		title: "SpaceTime",
		data: JSON.stringify(eventData),
	});
});

module.exports = {
	path: "/events",
	router,
};
