const router = require("express").Router();
const fetch = require("axios");

router.get("/", async (_, res) => {
	let body = await fetch(
		"https://lldev.thespacedevs.com/2.2.0/launch/upcoming?mode=list&limit=3"
	);

	let json = await body.data;

	let rocketData = [];

	json.results.forEach((result) => {
		let date = new Date(result.net);

		let formattedDate =
			[
				new String(date.getUTCDate()).padStart(2, "0"),
				new String(date.getUTCMonth() + 1).padStart(2, "0"),
				date.getUTCFullYear(),
			].join("/") +
			" " +
			[
				new String(date.getUTCHours()).padStart(2, "0"),
				new String(date.getUTCMinutes()).padStart(2, "0"),
				new String(date.getUTCSeconds()).padStart(2, "0"),
			].join(":");

		rocketData.push({
			id: result.id,
			name: result.name,
			date: formattedDate,
			lsp: result.lsp_name,
			location: result.location,
			image: result.image,
			status: result.status.name,
			statusDescription: result.status.description,
		});
	});

	res.render("pages/index", {
		title: "SpaceTime",
		stylesheet: "css/style.css",
		rocketData: JSON.stringify(rocketData),
	});
});

module.exports = {
	path: "/",
	router,
};
