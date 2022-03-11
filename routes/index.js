const router = require("express").Router();

const getData = require("../fetchFromAPI");

router.get("/", async (_, res) => {
	const rocketData = await getData(
		"https://lldev.thespacedevs.com/2.2.0/launch/upcoming?mode=list&limit=3"
	);

	res.render("pages/index", {
		title: "SpaceTime",
		stylesheet: "css/index.css",
		rocketData: JSON.stringify(rocketData),
	});
});

module.exports = {
	path: "/",
	router,
};
