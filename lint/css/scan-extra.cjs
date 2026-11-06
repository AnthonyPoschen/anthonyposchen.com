const svg = require("./plugins/svg-palette.js");
const inline = require("./plugins/inline-color.js");

const hits = [
	...svg.scanSvgFiles("web", "web/tokens.css"),
	...inline.scanDir("web"),
];

if (hits.length > 0) {
	for (const hit of hits) {
		console.error(`${hit.file}:${hit.line}: ${hit.message}`);
	}
	process.exit(1);
}
