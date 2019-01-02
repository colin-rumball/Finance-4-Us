import database from './firebase';

const databaseRefs = {
	pages: (pageId) => 'pages' + (pageId === undefined ? '/' : `/${pageId}`),
	expenses: (pageId, id) => `pages/${pageId}/expenses/` + (id === undefined ? '' : `${id}`),
	categories: (id) => `categories/` + (id === undefined ? '' : `${id}`),
	payments: (pageId, id) => `pages/${pageId}/payments/` + (id === undefined ? '' : `${id}`)
};

export default databaseRefs;