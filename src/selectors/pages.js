export const getCurrentPage = (pages) => {
	let currentPage = pages.find(page => page.current);
	if (currentPage === undefined) {
		currentPage = {id: 'invalid'};
	}
	return currentPage;
};