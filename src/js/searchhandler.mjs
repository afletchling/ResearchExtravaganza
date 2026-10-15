import ApiHandler from './apihandler.mjs';
import StorageHandler from './storagehandler.mjs';

export default class SearchHandler {
	holder = document.getElementById('card-holder');
	dialog = document.getElementById('detail-dialog');
	api = new ApiHandler();
	results = [];
	async searchTerm(text) {
		if (this.searching) return;
		this.searching = true;
		this.renderLoadingCircle();

		try {
			const response = await this.api.requestSources(text);
			this.results = response.docs.map((entry) => ({
				id: entry.key.substring(7),
				title: entry.title,
				author: entry.author_name[0] || 'Unknown',
				time:
					entry.time_facet != undefined
						? entry.time_facet[0]
						: 'Current',
				series:
					entry.series_name != undefined
						? entry.series_name[0]
						: 'None',
				ratings: entry.ratings_average || 0,
				year: entry.first_publish_year,
				contributors: entry.contributor || ['None'],
			}));

			this.renderHolderArray(this.results);
		} catch (exception) {
			console.error(`Failed to fetch sources: ${exception}`);
			this.holder.innerHTML =
				'<h2 class="msg-align">Failed to fetch sources. Please try again!</h2>';
		}

		this.searching = false;
	}
	renderHolderArray(data) {
		if (this.holder) {
			this.holder.innerHTML =
				data.length > 0
					? data
							.map((source) => this.renderCardTemplate(source))
							.join('\n')
					: '<h2 class="msg-align">No sources found. Please try again!</h2>';

			for (const card of this.holder.querySelectorAll('section')) {
				card.addEventListener('click', () => {
					const source = data.find(
						(comp) => comp.id == card.dataset.id,
					);

					if (this.dialog && source) {
						let isInStorage = StorageHandler.instance.isInStorage(
							source.id,
						);

						this.dialog.innerHTML = `
							${this.renderDetailTemplate(source)}
							<button id="add-storage">${
								isInStorage
									? 'Remove from storage'
									: 'Add to storage'
							}</button>
							<button commandfor="detail-dialog" command="close">Close</button>
						`;

						this.dialog.showModal();
						const addButton =
							document.getElementById('add-storage');
						if (addButton) {
							addButton.addEventListener('click', () => {
								if (isInStorage) {
									StorageHandler.instance.removeFromStorage(
										source.id,
									);
								} else {
									StorageHandler.instance.addToStorage(
										source,
									);
								}

								isInStorage = !isInStorage;
								addButton.textContent = isInStorage
									? 'Remove from storage'
									: 'Add to storage';
							});
						}
					}
				});
			}
		}
	}
	renderLoadingCircle() {
		if (this.holder) {
			this.holder.innerHTML = `<img class="msg-align" id="loading" src="/images/loading.svg"/>`;
		}
	}
	renderCardTemplate(data) {
		return `<section data-id="${data.id}">
			<h2>${data.title}</h2>
			<h3>Author - ${data.author}</h3>
			<p>Series: ${data.series}</p>
			<p>Time: ${data.time}</p>
			<p>Average Rating: ${data.ratings.toFixed(2)}</p>
		</section>`;
	}
	renderDetailTemplate(data) {
		return `<h2>${data.title}</h2>
			<h3>Author - ${data.author}</h3>
			<h4>Contributors - ${data.contributors.slice(0, 4).join(', ')}</h4>
			<p>Series: ${data.series}</p>
			<p>Time: ${data.time}</p>
			<p>Publish Year: ${data.year}</p>
			<p>Average Rating: ${data.ratings.toFixed(2)}</p>
			<p>Id: ${data.id}</p>`;
	}
}
