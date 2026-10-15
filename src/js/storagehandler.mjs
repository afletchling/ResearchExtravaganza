const CHECKS = {
	id: 'string',
	title: 'string',
	author: 'string',
	time: 'string',
	series: 'string',
	ratings: 'number',
	year: 'number',
	contributors: 'object',
};

export default class StorageHandler {
	static instance = new StorageHandler();
	storage = this.getData('storage') || [];
	storeData(key, value) {
		return localStorage.setItem(key, JSON.stringify(value));
	}
	getData(key) {
		const data = localStorage.getItem(key);
		return data != undefined ? JSON.parse(data) : data;
	}
	addToStorage(value) {
		if (this.storage.find((entry) => value.id == entry.id) == undefined) {
			this.storage.push(value);
			this.storeData('storage', this.storage);
		}
	}
	removeFromStorage(id) {
		const index = this.storage.findIndex((entry) => id == entry.id);
		if (index != -1) {
			this.storage.splice(index, 1);
			this.storeData('storage', this.storage);
		}
	}
	isInStorage(id) {
		return this.storage.find((entry) => id == entry.id) != undefined;
	}
	loadData(data) {
		try {
			const parsed = JSON.parse(data);
			if (parsed != undefined && Array.isArray(parsed)) {
				const isValid =
					parsed.find((source) => {
						for (const [name, vType] of Object.entries(CHECKS)) {
							if (typeof source[name] != vType) {
								return true;
							}
						}
					}) == undefined;

				if (isValid) {
					this.storeData('storage', parsed);
					this.storage = parsed;
				}
			}
		} catch (exception) {
			console.log(`Failed to parse data: ${exception}`);
		}
	}
}
