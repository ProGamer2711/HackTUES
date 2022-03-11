const router = require("express").Router();

router.get("/", (_, res) =>
	res.render("pages/index", { title: "SpaceTime", stylesheet: "css/style.css" })
);

module.exports = {
	path: "/",
	router,
};
