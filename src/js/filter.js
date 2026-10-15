import SearchHandler from './searchhandler.mjs';
import StorageHandler from './storagehandler.mjs';
import { loadNavLogic } from './utils.mjs';

const handler = new SearchHandler();
const searchbox = document.getElementById('search-box');
const filterinput = document.getElementById('filter-type');
const FILTERS = {
	source: (source) =>
		source.title
			.toLocaleLowerCase()
			.includes(searchbox.value.toLocaleLowerCase()),
	author: (source) =>
		source.author
			.toLocaleLowerCase()
			.includes(searchbox.value.toLocaleLowerCase()),
	'4star': (source) => source.ratings >= 4 && source.ratings <= 4.99,
	'3star': (source) => source.ratings >= 3 && source.ratings <= 3.99,
	'2star': (source) => source.ratings >= 2 && source.ratings <= 2.99,
	'1star': (source) => source.ratings >= 1 && source.ratings <= 1.99,
	'0star': (source) => source.ratings <= 0,
	b200: (source) => source.year < 2000,
	a200: (source) => source.year >= 2000,
	b201: (source) => source.year < 2010,
	a201: (source) => source.year >= 2010,
};

function refreshFilters(filterType) {
	handler.renderHolderArray(
		StorageHandler.instance.storage.filter(
			FILTERS[filterType] || FILTERS.source,
		),
	);
}

if (searchbox && filterinput) {
	const data = StorageHandler.instance.getData('lastFilter');
	if (data != undefined) {
		filterinput.value = data.filter;
	}

	refreshFilters(filterinput.value);

	searchbox.addEventListener('input', () =>
		refreshFilters(filterinput.value),
	);
	filterinput.addEventListener('change', () => {
		refreshFilters(filterinput.value);
		StorageHandler.instance.storeData('lastFilter', {
			filter: filterinput.value,
		});
	});
}

loadNavLogic();
