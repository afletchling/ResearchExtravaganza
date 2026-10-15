export default class ApiHandler {
	async requestSources(text) {
		const response = await fetch(
			`https://openlibrary.org/search.json?${new URLSearchParams({
				q: text,
				fields: '*',
				limit: 20,
			})}`,
		);

		if (response.ok) {
			return await response.json();
		} else {
			throw new Error(
				`Failed to fetch sources: ${await response.text()}`,
			);
		}
	}
}
