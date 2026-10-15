export function loadNavLogic() {
	const navButton = document.getElementById('menu');
	const navHolder = document.querySelector('.navigation');

	if (navButton && navHolder) {
		navButton.addEventListener('click', () => {
			navButton.classList.toggle('active');
			navHolder.classList.toggle('active');
		});
	}
}
