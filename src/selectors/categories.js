export const getCategoryFromId = (id, categories) => {
	return categories.find((el) => el.id === id);
};