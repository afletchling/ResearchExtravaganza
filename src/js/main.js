import SearchHandler from './searchhandler.mjs';
import StorageHandler from './storagehandler.mjs';
import { loadNavLogic } from './utils.mjs';

const handler = new SearchHandler();
const searchbox = document.getElementById('search-box');
const searchbutton = document.getElementById('submit-button');

if (searchbox && searchbutton) {
	const data = StorageHandler.instance.getData('lastSearch');
	if (data != undefined) {
		searchbox.value = data.keyword;
	}

	searchbutton.addEventListener('click', () => {
		handler.searchTerm(searchbox.value);
		StorageHandler.instance.storeData('lastSearch', {
			keyword: searchbox.value,
		});
	});

	searchbox.addEventListener('keydown', (event) => {
		if (event.key == 'Enter') {
			handler.searchTerm(searchbox.value);
			StorageHandler.instance.storeData('lastSearch', {
				keyword: searchbox.value,
			});
		}
	});
}

loadNavLogic();
