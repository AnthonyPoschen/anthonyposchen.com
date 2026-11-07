const config = require("./lint/css/create-config.cjs")({
	themeFiles: ["web/tokens.css"],
	themeFile: "web/tokens.css",
	themePath: "web/tokens.css",
	prefix: "palette-",
	// No retired palette names yet. The pattern stays so the shared rule is on.
	deprecated: ["^--palette-retired(-|$)"],
	colorPrefixes: ["palette-"],
	placeholderToken: "--palette-placeholder",
});

// Display headings use line-height 1.02. The shared minimum of 1.15 changes
// the measured page, so this rule is off until the design leading changes.
config.rules["lint/no-clipped-heading"] = null;

module.exports = config;
