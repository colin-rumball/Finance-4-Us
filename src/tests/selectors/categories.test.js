import {mapIdToCategory} from './../../selectors/categories';
import categories from './../fixtures/categories';

test('should return a valid category from id', () => {
   const category = mapIdToCategory(categories[0].id, categories);
   expect(category).toEqual(categories[0]);
});

test('should not return a category from an invalid id', () => {
   const category = mapIdToCategory('invalid', categories);
   expect(category).toBeFalsy();
})