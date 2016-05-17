import { SELECT_CATEGORY } from 'report/actions/types';

export function selectCategory (categoryId) {
    return { type: SELECT_CATEGORY, categoryId };
}
