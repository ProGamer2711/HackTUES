const fetch = require("axios");

module.exports = async function getData(url, params) {
	let body = await fetch(
		url ||
			`https://lldev.thespacedevs.com/2.2.0/launch/?mode=list&limit=3&${params}`
	);

	let json = await body.data;

	let rocketData = [];

	if (json.results.length === 0) return false;

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
			previous: json.previous,
			next: json.next,
			name: result.name,
			date: formattedDate,
			lsp: result.lsp_name,
			location: result.location,
			image: result.image,
			status: result.status.name,
			statusDescription: result.status.description,
		});
	});

	return rocketData;
};
