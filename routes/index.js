const router = require("express").Router();

const { getLaunchData } = require("../fetchFromAPI");

router.get("/", async (_, res) => {
	const rocketData = await getLaunchData(
		"https://lldev.thespacedevs.com/2.2.0/launch/upcoming?mode=list&limit=3"
	);

	res.render("pages/index", {
		title: "SpaceTime",
		rocketData: JSON.stringify(rocketData),
	});
});

module.exports = {
	path: "/",
	router,
};
