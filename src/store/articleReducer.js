import {createSlice} from "@reduxjs/toolkit"
import {articleService, profileService} from "../services/api";
import {formatError} from "../lib/utils";
import {isObject} from "lodash";


const DEFAULT_PER_PAGE = 3;
const DEFAULT_PAGINATION_META = { current_page: 1, last_page: 1, per_page: DEFAULT_PER_PAGE };
const FILTERS = [
    {value: 'created_at_desc', label: 'Latest', sort: {sort_by: 'created_at', sort_direction: 'desc'}},
    {value: 'created_at_asc', label: 'Oldest', sort: {sort_by: 'created_at', sort_direction: 'asc'}},
    {value: 'likes_count', label: 'Most liked', sort: {sort_by: 'likes_count', sort_direction: 'desc'}},
    {value: 'views', label: 'Most viewed', sort: {sort_by: 'views', sort_direction: 'desc'}},
];
const DEFAULT_FILTER = FILTERS[0];

const initialState = {
    articles: [],
    meta: DEFAULT_PAGINATION_META,
    isFetching: false,
    isFiltering: false,
    lastFetchTime: null,
    fetchArticlesError: null,
    filters: FILTERS,
    currentFilter: DEFAULT_FILTER,

    article: null,
    isFetchingArticle: false,
    fetchArticleError: null,
    
    profile: {
        articles: [],
        meta: DEFAULT_PAGINATION_META,
        currentFilter: DEFAULT_FILTER,
        isFetching: false,
        isFiltering: false,
        error: null,
    },
    viewer: {
        isViewing: false,
        error: null,
        
    },
    liker: {
        currentArticle: null,
        isLiking: false,
        likeError: null,
    },
    creator: {
        isCreating: false,
        error: null,
        createdArticle: null,
    },
    updater: {
        isUpdating: false,
        error: null,
        updatedArticle: null,
    },
    deleter: {
        isDeleting: false,
        error: null,
        deleteArticle: null,
    }
}

const articleSlice = createSlice({
    name: 'article',
    initialState: initialState,
    reducers: {
        fetchArticlesRequested: state => {
            state.isFetching = true;
        },
        fetchArticlesCompleted: state => {
            state.isFetching = false;
        },
        fetchArticlesFailed: (state, {payload}) => {
            state.fetchArticlesError = payload;
        },
        articlesFetched: (state, {payload}) => {
            state.meta = payload.meta;

            if (state.meta.current_page <= 1) {
                state.articles = payload.data;
            } else {
                const mappedIDs = state.articles.map(article => article.id);

                state.articles = [...state.articles, ...payload.data.filter(article => {
                    return !mappedIDs.includes(article.id);
                })]
            }
        },
        clearArticlesError: state => {
            state.fetchArticlesError = null
        },

        filterArticles: (state, {payload}) =>{
            state.currentFilter = payload;
            state.isFiltering = true;

        },
        articlesFiltered: (state) => {
            state.isFiltering = false;
        },

        fetchProfileArticlesRequested: (state) => {
            state.profile.isFetching = true;
        },
        fetchProfileArticlesCompleted: (state) => {
            state.profile.isFetching = false;
        },
        fetchProfileArticlesFailed: (state, {payload}) => {
            state.profile.fetchError = payload;
        },
        profileArticlesFetched: (state, {payload}) => {
            state.profile.meta = payload.meta;

            if (state.profile.meta.current_page <= 1) {
                state.profile.articles = payload.data;
            } else {
                const mappedIDs = state.profile.articles.map(article => article.id);

                state.profile.articles = [...state.profile.articles, ...payload.data.filter(article => {
                    return !mappedIDs.includes(article.id);
                })]
            }
        },
        clearProfileArticles: state => {
            state.profile = initialState.profile;
        },

        filterProfileArticles: (state, {payload}) =>{
            state.profile.currentFilter = payload;
            state.profile.isFiltering = true;
        },
        profileArticlesFiltered: state => {
            state.profile.isFiltering = false;
        },
        profileArticlesCleared: state => {
            state.profile = initialState.profile;
        },
        clearProfileArticlesError: state => {
            state.profile.fetchError = null;
        },

        likeArticleRequested: (state, {payload}) => {
            state.liker.isLiking = true;
            state.liker.currentArticle = payload;
        },
        likeArticleCompleted: (state) => {
            state.liker.isLiking = false;
        },
        likeArticleFailed: (state, {payload}) => {
            state.liker.likeError = payload;
        },
        clearLikeError: state => {
            state.liker.likeError = null;
        },

        articleChanged: (state, {payload}) => {
            const indexInArticles = state.articles.findIndex(article => article.id === payload.id);
            const indexInProfileArticles = state.profile.articles.findIndex(article => article.id === payload.id);

            if (state.article?.id === payload.id) state.article = payload;

            if (indexInArticles > -1) state.articles[indexInArticles] = payload;
            if (indexInProfileArticles > -1) state.profile.articles[indexInProfileArticles] = payload;
        },

        fetchArticleRequested: state => {
            state.isFetchingArticle = true
        },
        articleFetched: (state, {payload}) => {
            state.article = payload
        },
        fetchArticleFailed: (state, {payload}) => {
            state.fetchArticleError = payload
        },
        fetchArticleCompleted: state => {
            state.isFetchingArticle = false
        },
        clearArticleError: state => {
            state.fetchArticleError = null
        },

        viewArticleRequested: state => {
            state.viewer.isViewing = true
        },
        clearViewArticleError: state => {
            state.viewer.error = null
        },
        viewArticleFailed: (state, {payload}) => {
            state.viewer.error = payload
        },
        viewArticleCompleted: state => {
            state.viewer.isViewing = false
        },

        createArticleRequested: state => {
            state.creator.isCreating = true
        },
        articleCreated: (state, {payload}) => {
            Object.assign(state, {
                initialState,
                ...{create: {createdArticle: payload}}
            });
        },
        createArticleFailed: (state, {payload}) => {
            state.creator.error = payload
        },
        createArticleCompleted: state => {
            state.creator.isCreating = false
        },
        unsetCreatedArticle: state => {
            state.creator.createdArticle = null
        },

        updateArticleRequested: state => {
            state.updater.isUpdating = true
        },
        articleUpdated: (state, {payload}) => {
            state.updater.updatedArticle = payload;
        },
        updateArticleFailed: (state, {payload}) => {
            state.updater.error = payload
        },
        updateArticleCompleted: state => {
            state.updater.isUpdating = false
        },
        unsetUpdatedArticle: state => {
            state.updater.updatedArticle = null
        },

        deleteArticleRequested: state => {
            state.deleter.isDeleting = true;
        },
        articleDeleted: (state, {payload}) => {
            state.articles = state.articles.filter(a => a.id !== payload.id);
            state.profile.articles = state.profile.articles.filter(a => a.id !== payload.id);
        },
        deleteArticleCompleted: state => {
            state.deleter.isDeleting = true;
        },
        deleteArticleFailed: (state, {payload}) => {
            state.deleter.error = payload;
        },
        clearDeleteError: state => {
            state.deleter.error = null;
        },

        clearAllArticles: state => {
            Object.assign(state, initialState)
        },
    },
})


// Extract the action creators object and the reducer
const { actions, reducer } = articleSlice
// Extract and export each action creator by name
const {
    fetchArticlesRequested,
    articlesFetched,
    fetchArticlesFailed,
    fetchArticlesCompleted,
    clearArticlesError,

    fetchProfileArticlesRequested,
    profileArticlesFetched,
    fetchProfileArticlesFailed,
    fetchProfileArticlesCompleted,
    clearProfileArticlesError,

    articleChanged,

    likeArticleRequested,
    likeArticleCompleted,
    likeArticleFailed,
    clearLikeError,

    fetchArticleRequested,
    articleFetched,
    clearArticleError,
    fetchArticleFailed,
    fetchArticleCompleted,

    articlesFiltered,
    profileArticlesFiltered,

    viewArticleRequested,
    clearViewArticleError,
    viewArticleFailed,
    viewArticleCompleted,

    createArticleRequested,
    articleCreated,
    createArticleFailed,
    createArticleCompleted,

    updateArticleRequested,
    articleUpdated,
    updateArticleFailed,
    updateArticleCompleted,

    deleteArticleRequested,
    articleDeleted,
    deleteArticleCompleted,
    deleteArticleFailed,
    clearDeleteError,

} = actions

export const {
    filterArticles,
    filterProfileArticles,
    clearAllArticles,
    clearProfileArticles,
    unsetCreatedArticle,
    unsetUpdatedArticle,
} = actions;

// Export the reducer, either as a default or named export
export default reducer;

export const loadArticles = (query) => async (dispatch, getState) => {
    try {
        dispatch(fetchArticlesRequested());
        const {data, meta} = await articleService.fetchArticles(query);
        dispatch(articlesFetched({data, meta}));
        dispatch(clearArticlesError());
    } catch (e) {
        dispatch(fetchArticlesFailed(formatError(e)));
    } finally {
        dispatch(fetchArticlesCompleted());
        if (getState().article.isFiltering) {
            dispatch(articlesFiltered());
        }
    }
}

export const loadUserArticles = (username, query) => async (dispatch, getState) => {
    try {
        dispatch(fetchProfileArticlesRequested());
        const {data, meta} = await profileService.fetchUserArticles(username, query);
        dispatch(profileArticlesFetched({data, meta}));
        dispatch(clearProfileArticlesError());
    } catch (e) {
        dispatch(fetchProfileArticlesFailed(formatError(e)));
    } finally {
        dispatch(fetchProfileArticlesCompleted());
        if (getState().article.profile.isFiltering) {
            dispatch(profileArticlesFiltered());
        }
    }
}

export const loadArticle = (id) => async dispatch => {
    try {
        dispatch(fetchArticleRequested());
        const article = await articleService.fetchArticle(id)

        dispatch(articleFetched(article));
        dispatch(clearArticleError());
    } catch (e) {
        dispatch(fetchArticleFailed(formatError(e)));
    } finally {
        dispatch(fetchArticleCompleted());
    }
}

export const emptyUserArticles = () => dispatch => {
    dispatch(clearProfileArticles());
}

export const likeOrUnlikeArticle = (article) => async dispatch => {
    try {
        dispatch(likeArticleRequested(article))
        const updatedArticle = !article.is_liked
            ? await articleService.likeArticle(article.id)
            : await articleService.unlikeArticle(article.id);

        dispatch(articleChanged(updatedArticle));
        dispatch(clearLikeError());
    } catch (e) {
        dispatch(likeArticleFailed(formatError(e)));
    } finally {
        dispatch(likeArticleCompleted());
    }
}

export const incrementArticleViews = (id) => async dispatch => {
    try {
        dispatch(viewArticleRequested());
        const article = await articleService.incrementArticleViews(id);
        dispatch(articleChanged(article));
        dispatch(clearViewArticleError());
    } catch (e) {
        dispatch(viewArticleFailed(formatError(e)));
    } finally {
        dispatch(viewArticleCompleted());
    }
}

export const createArticle = data => async dispatch => {
    try {
        dispatch(createArticleRequested())
        const article = await articleService.createArticle(data);
        dispatch(articleCreated(article))
    } catch (e) {
        dispatch(createArticleFailed(formatError(e)));
    } finally {
        dispatch(createArticleCompleted());
    }
}

export const updateArticle = data => async dispatch => {
    try {
        dispatch(updateArticleRequested())
        const article = await articleService.updateArticle(data);
        dispatch(articleUpdated(article))
    } catch (e) {
        dispatch(updateArticleFailed(formatError(e)));
    } finally {
        dispatch(updateArticleCompleted());
    }
}

export const deleteArticle = article => async dispatch => {
    try {
        dispatch(deleteArticleRequested())
        const id = isObject(article) ? article.id : article;
        const article = await articleService.deleteArticle(id);
        dispatch(articleDeleted(article));
        dispatch(clearDeleteError());
    } catch (e) {
        dispatch(deleteArticleFailed(formatError(e)));
    } finally {
        dispatch(deleteArticleCompleted());
    }
}