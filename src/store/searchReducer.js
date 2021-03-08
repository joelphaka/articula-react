import {createSlice} from '@reduxjs/toolkit'
import {
    DEFAULT_ARTICLE_FILTER,
    DEFAULT_PAGINATION_META, DEFAULT_PER_PAGE,
    getPaginatedData, notifyArticleChanged
} from "./common";
import {searchService} from "../services/api";
import {formatError} from "../lib/utils";

const initialState = {
    isSearching: false,
    query: {query: '', page: 1, per_page: DEFAULT_PER_PAGE},
    error: null,
    articleSearch: {
        articles: [],
        meta: DEFAULT_PAGINATION_META,
        currentFilter: DEFAULT_ARTICLE_FILTER,
        isSearchingArticles: false,
        isFiltering: false,
        isFetchingMore: false,
        error: null,
    },
    userSearch: {
        users: [],
        meta: DEFAULT_PAGINATION_META,
        isSearchingUsers: false,
        isFiltering: false,
        isFetchingMore: false,
        error: null,
    }
}

const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        searchArticlesRequested: (state, {payload}) => {
            state.isSearching = true;
            state.articleSearch.isSearchingArticles = true;
            state.articleSearch.isFetchingMore = payload.page > state.articleSearch.meta.current_page;
        },
        articlesSearched: (state, {payload}) => {
            state.articleSearch.meta = payload.meta;
            state.articleSearch.articles = getPaginatedData(
                state.articleSearch.articles,
                payload.data,
                payload.meta
            );
        },
        searchArticlesFailed: (state, {payload}) => {
            state.articleSearch.error = payload;
            state.error = payload;
        },
        searchArticlesCompleted: state => {
            state.isSearching = false;
            state.articleSearch.isSearchingArticles = false;

            if (state.articleSearch.isFetchingMore) state.articleSearch.isFetchingMore = false;
        },
        filterSearchedArticles: (state, {payload}) => {
            state.articleSearch.currentFilter = payload;
            state.articleSearch.isFiltering = true;
        },
        searchedArticlesFiltered: state => {
            state.articleSearch.isFiltering = false;
        },

        searchUsersRequested: (state, {payload}) => {
            state.isSearching = true;
            state.userSearch.isSearchingUsers = true;
            state.userSearch.isFetchingMore = payload.page > state.userSearch.meta.current_page;
        },
        usersSearched: (state, {payload}) => {
            state.userSearch.meta = payload.meta;

            state.userSearch.users = getPaginatedData(
                state.userSearch.users,
                payload.data,
                payload.meta
            );
        },
        searchUsersFailed: (state, {payload}) => {
            state.userSearch.error = payload;
            state.error = payload;
        },
        searchUsersCompleted: state => {
            state.isSearching = false;
            state.userSearch.isSearchingUsers = false;

            if (state.userSearch.isFetchingMore) state.userSearch.isFetchingMore = false;
        },
        filterSearchedUsers: (state, {payload}) => {
            state.userSearch.currentFilter = payload;
            state.userSearch.isFiltering = true;
        },
        searchedUsersFiltered: state => {
            state.userSearch.isFiltering = false;
        },

        resetSearch: state => {
            Object.assign(state, initialState);
        },
        clearSearchError: state => {
            state.error = null;
            state.articleSearch.error = null;
            state.userSearch.error = null;
        }
    },
    extraReducers: {
        [notifyArticleChanged.type]: (state, {payload}) => {
            const index = state.articleSearch.articles.findIndex(article => article.id === payload.id);

            if (index > -1) state.articleSearch.articles[index] = payload;
        },
    }
});

const { actions, reducer } = searchSlice

const {
    searchArticlesRequested,
    articlesSearched,
    searchArticlesFailed,
    searchArticlesCompleted,

    searchUsersRequested,
    usersSearched,
    searchUsersFailed,
    searchUsersCompleted,

    searchedArticlesFiltered,
    searchedUsersFiltered,
    clearSearchError,
} = actions;

export const {
    filterSearchedArticles,
    filterSearchedUsers,
    resetSearch
} = actions;

export default reducer;

export const searchArticles = params => async (dispatch, getState) => {
    try {
        if (getState().search.error) dispatch(clearSearchError());

        dispatch(searchArticlesRequested(params));
        const {data, meta} = await searchService.searchArticles(params);

        dispatch(articlesSearched({data, meta}));
    } catch (e) {
        dispatch(searchArticlesFailed(formatError(e)));
    } finally {
        dispatch(searchArticlesCompleted());
        if (getState().search.articleSearch.isFiltering) {
            dispatch(searchedArticlesFiltered());
        }
    }
}
export const searchUsers = (params) => async (dispatch, getState) => {
    try {
        if (getState().search.error) dispatch(clearSearchError());

        dispatch(searchUsersRequested(params));
        const {data, meta} = await searchService.searchUsers(params);

        dispatch(usersSearched({data, meta}));
    } catch (e) {
        dispatch(searchUsersFailed(formatError(e)));
    } finally {
        dispatch(searchUsersCompleted());

        if (getState().search.userSearch.isFiltering) {
            dispatch(searchedUsersFiltered());
        }
    }
}
