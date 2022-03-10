require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const routesPath = path.join(__dirname, "routes");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

try {
	fs.readdirSync(routesPath).forEach((file) => {
		const route = require(path.join(routesPath, file));
		app.use(route.path, route.router);
	});

	app.all("*", (_, res) => res.redirect("/"));
} catch (err) {
	console.log(err);
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
