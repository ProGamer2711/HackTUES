const router = require("express").Router();

router.all("/", (_, res) => {
	res.render("pages/error", {
		title: "SpaceTime",
	});
});

module.exports = {
	path: "/error",
	router,
};
