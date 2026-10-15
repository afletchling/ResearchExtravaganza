import SearchHandler from './searchhandler.mjs';
import StorageHandler from './storagehandler.mjs';
import { loadNavLogic } from './utils.mjs';

const handler = new SearchHandler();
const saveButton = document.getElementById('save-button');
const loadButton = document.getElementById('load-button');
const box = document.getElementById('input-box');

handler.renderHolderArray(StorageHandler.instance.storage);

if (saveButton && loadButton && box) {
	saveButton.addEventListener('click', () => {
		box.value = JSON.stringify(StorageHandler.instance.storage);
	});

	loadButton.addEventListener('click', () => {
		StorageHandler.instance.loadData(box.value);
		handler.renderHolderArray(StorageHandler.instance.storage);
	});
}

loadNavLogic();
