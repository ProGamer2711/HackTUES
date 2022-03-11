const router = require("express").Router();

router.all("/", (_, res) => {
	res.render("pages/noResultsFound", {
		title: "SpaceTime",
	});
});

module.exports = {
	path: "/no_results_found",
	router,
};
