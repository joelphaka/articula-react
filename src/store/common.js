import {createAction} from "@reduxjs/toolkit";
import {isObject, isArray} from "lodash";

export const logout = createAction('LOGOUT');

export const DEFAULT_PER_PAGE = 3;

export const DEFAULT_PAGINATION_META = {
    current_page: 1,
    last_page: 1,
    per_page: DEFAULT_PER_PAGE,
    is_last_page: true,
    has_more_pages: false,
};

export const ARTICLE_FILTERS = [
    {value: 'created_at_desc', label: 'Latest', sort: {sort_by: 'created_at', sort_direction: 'desc'}},
    {value: 'created_at_asc', label: 'Oldest', sort: {sort_by: 'created_at', sort_direction: 'asc'}},
    {value: 'likes_count', label: 'Most liked', sort: {sort_by: 'likes_count', sort_direction: 'desc'}},
    {value: 'views', label: 'Most viewed', sort: {sort_by: 'views', sort_direction: 'desc'}},
];

export const DEFAULT_ARTICLE_FILTER = ARTICLE_FILTERS[0];

export const getPaginatedData = (items, newItems, meta) => {
    let data;

    if (meta.current_page <= 1) {
        data = newItems;
    } else {
        const uniqueIDs = items.map(item => isObject(item) ? item.id : item);

        data = [
            ...items,
            ...newItems.filter(item => !uniqueIDs.includes(isObject(item) ? item.id : item))
        ]
    }

    return data;
}