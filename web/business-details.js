window.BusinessDetails = {
	publicName: "Anthony Poschen",
	legalName: "Anthony Peter Vincent Poschen",
	abn: "53 034 942 458",
	country: "Australia",
	location: "Australia",
	email: "zanven42@gmail.com",
	githubUrl: "https://github.com/AnthonyPoschen",
	xUrl: "https://x.com/AnthonyPoschen",
	copyrightYear: "2026",
	businessType: "Individual / Sole Trader",
	website: "https://anthonyposchen.com",
	siteTitle: "Anthony Poschen - Independent Software Developer",
	siteDescription: "Australian independent software developer building mobile apps, web apps, games, game-server tools, and hosting-related software products.",
};

window.Business = {
	details: window.BusinessDetails,
	get(key) {
		return this.details[key] ?? "";
	},
	href(key) {
		if (key === "email") return `mailto:${this.get("email")}`;
		return this.get(key);
	},
	apply(root = document) {
		if (root === document) {
			document.title = this.get("siteTitle");
			document.querySelector('meta[name="description"]')?.setAttribute("content", this.get("siteDescription"));
		}

		root.querySelectorAll("[data-business]").forEach((element) => {
			element.textContent = this.get(element.dataset.business);
		});

		root.querySelectorAll("[data-business-href]").forEach((element) => {
			const href = this.href(element.dataset.businessHref);
			if (href) element.setAttribute("href", href);
		});
	},
};

document.addEventListener("DOMContentLoaded", () => window.Business.apply());
