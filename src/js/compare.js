import SearchHandler from './searchhandler.mjs';
import StorageHandler from './storagehandler.mjs';
import { loadNavLogic } from './utils.mjs';

const handler = new SearchHandler();
const holder = document.getElementById('compare-holder');

function processHolder(sholder, view) {
	for (const card of sholder.querySelectorAll('section')) {
		card.addEventListener('click', () => {
			const source = StorageHandler.instance.storage.find(
				(comp) => comp.id == card.dataset.id,
			);

			if (source) {
				sholder.classList.add('hidden');
				view.classList.remove('hidden');
				view.innerHTML = `
					${handler.renderDetailTemplate(source)}
					<button>Close</button>
				`;

				const close = view.querySelector('button');
				if (close) {
					close.addEventListener('click', () => {
						sholder.classList.remove('hidden');
						view.classList.add('hidden');
					});
				}
			}
		});
	}
}

if (holder) {
	for (const side of holder.querySelectorAll('section')) {
		const box = side.querySelector('#search-box');
		const sholder = side.querySelector('#card-compare-holder');
		const sview = side.querySelector('#compare-view');

		if (sholder) {
			sholder.innerHTML = StorageHandler.instance.storage
				.filter((source) =>
					source.title
						.toLocaleLowerCase()
						.includes(box.value.toLocaleLowerCase()),
				)
				.map((source) => handler.renderCardTemplate(source))
				.join('\n');

			processHolder(sholder, sview);
		}

		if (box) {
			box.addEventListener('input', () => {
				if (sholder) {
					sholder.innerHTML = StorageHandler.instance.storage
						.filter((source) =>
							source.title
								.toLocaleLowerCase()
								.includes(box.value.toLocaleLowerCase()),
						)
						.map((source) => handler.renderCardTemplate(source))
						.join('\n');

					processHolder(sholder, sview);
				}
			});
		}
	}
}

loadNavLogic();
