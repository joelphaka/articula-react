import {createSlice} from '@reduxjs/toolkit'
import {articleService, profileService} from "../services/api";
import {formatError} from "../lib/utils";
import {incrementViewCount} from "../services/api/article.service";

const defaultFilter = {
    value: 'created_at_desc',
    label: 'Latest',
    sort: {sort_by: 'created_at', sort_direction: 'desc'}
};

const defaultPaginationMeta = { current_page: 1, last_page: 1, per_page: 3 }

const initialState = {
    articles: [],
    meta: defaultPaginationMeta,
    isFetching: false,
    isFiltering: false,
    lastFetchTime: null,
    fetchError: null,
    profile: {
        articles: [],
        meta: defaultPaginationMeta,
        currentFilter: defaultFilter,
        isFetching: false,
        fetchError: null,
    },
    currentArticle: null,
    isLiking: false,
    likeError: null,
    filters: [
        defaultFilter,
        {value: 'created_at_asc', label: 'Oldest', sort: {sort_by: 'created_at', sort_direction: 'asc'}},
        {value: 'likes_count', label: 'Most liked', sort: {sort_by: 'likes_count', sort_direction: 'desc'}},
        {value: 'views', label: 'Most viewed', sort: {sort_by: 'views', sort_direction: 'desc'}},
    ],
    currentFilter: defaultFilter,

    article: null,
    isFetchingArticle: false,
    articleFetchError: null,
    isViewingArticle: false,
    articleViewError: null,

    isCreatingArticle: false,
    articleCreateError: null,

    isUpdatingArticle: false,
    articleUpdateError: null,
}

const articleSlice = createSlice({
    name: 'article',
    initialState: initialState,
    reducers: {
        articlesFetchBegan: state => {
            state.isFetching = true;
        },
        articlesFetchEnded: state => {
            state.isFetching = false;
        },
        articlesFetchFailed: (state, {payload}) => {
            state.fetchError = payload;
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
        articlesFilteringBegan: (state, {payload}) =>{
            state.currentFilter = payload;
            state.isFiltering = true;

        },
        articlesFiltered: (state) => {
            state.isFiltering = false;
        },
        ////

        profileArticlesFetchBegan: (state) => {
            state.profile.isFetching = true;
        },
        profileArticlesFetchEnded: (state) => {
            state.profile.isFetching = false;
        },
        profileArticlesFetchFailed: (state, {payload}) => {
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
        profileArticlesFilteringBegan: (state, {payload}) =>{
            state.profile.currentFilter = payload;
            state.profile.isFiltering = true;

        },
        profileArticlesFiltered: (state, {payload}) => {
            state.profile.isFiltering = false;
        },
        profileArticlesEmptied: state => {
            state.profile = initialState.profile;
        },

        ////
        likeBegan: (state, {payload}) => {
            state.isLiking = true;
            state.currentArticle = payload;
        },
        likeEnded: (state) => {
            state.isLiking = false;
            //state.currentArticle = null;
        },
        likeFailed: (state, {payload}) => {
            state.likeError = payload;
        },
        articleChanged: (state, {payload}) => {
            const indexInArticles = state.articles.findIndex(article => article.id === payload.id);
            const indexInProfileArticles = state.profile.articles.findIndex(article => article.id === payload.id);

            if (state.article?.id === payload.id) state.article = payload;

            if (indexInArticles > -1) state.articles[indexInArticles] = payload;
            if (indexInProfileArticles > -1) state.profile.articles[indexInProfileArticles] = payload;
        },
        articlesErrorCleared: state => {
            state.fetchError = null;
        },
        profileArticlesErrorCleared: state => {
            state.profile.fetchError = null;
        },
        likeErrorCleared: state => {
            state.likeError = null;
        },

        fetchArticleBegan: state => {
            state.isFetchingArticle = true;
        },
        articleFetched: (state, {payload}) => {
            state.article = payload;
        },
        articleFetchErrorCleared: state => {
            state.articleFetchError = null;
        },
        articleFetchFailed: (state, {payload}) =>  {
            state.articleFetchError = payload;
        },
        articleFetchEnded: state => {
            state.isFetchingArticle = false;
        },
        articleViewingBegan: state => {
            state.isViewingArticle = true;
        },
        articleViewErrorCleared: state => {
            state.articleViewError = null;
        },
        articleViewingFailed: (state, {payload}) => {
            state.articleViewError = payload;
        },
        articleViewingEnded: state => {
            state.isViewingArticle = false;
        }
    },
})


// Extract the action creators object and the reducer
const { actions, reducer } = articleSlice
// Extract and export each action creator by name
const {
    articlesFetchBegan,
    articlesFetched,
    articlesFetchFailed,
    articlesFetchEnded,
    articlesErrorCleared,

    profileArticlesFetchBegan,
    profileArticlesFetched,
    profileArticlesFetchFailed,
    profileArticlesFetchEnded,
    profileArticlesErrorCleared,
    profileArticlesEmptied,

    articleChanged,

    likeBegan,
    likeEnded,
    likeFailed,
    likeErrorCleared,

    fetchArticleBegan,
    articleFetched,
    articleFetchErrorCleared,
    articleFetchFailed,
    articleFetchEnded,

    articleViewingBegan,
    articleViewErrorCleared,
    articleViewingFailed,
    articleViewingEnded
} = actions
// Export the reducer, either as a default or named export
export default reducer

const {
    articlesFiltered,
    articlesFilteringBegan,
    profileArticlesFilteringBegan,
    profileArticlesFiltered
} = actions;

export const loadArticles = (query) => async (dispatch, getState) => {
    try {
        dispatch(articlesFetchBegan());
        const {data, meta} = await articleService.fetchArticles(query);
        dispatch(articlesFetched({data, meta}));
        dispatch(articlesErrorCleared());
    } catch (e) {
        dispatch(articlesFetchFailed(formatError(e)));
    } finally {
        dispatch(articlesFetchEnded());
        if (getState().article.isFiltering) {
            console.log(getState())

            dispatch(articlesFiltered());
        }
    }
}

export const loadUserArticles = (username, query) => async (dispatch, getState) => {
    try {
        dispatch(profileArticlesFetchBegan());
        const {data, meta} = await profileService.fetchUserArticles(username, query);
        dispatch(profileArticlesFetched({data, meta}));
        dispatch(profileArticlesErrorCleared());
    } catch (e) {
        dispatch(profileArticlesFetchFailed(formatError(e)));
    } finally {
        dispatch(profileArticlesFetchEnded());
        if (getState().article.profile.isFiltering) {
            dispatch(profileArticlesFiltered());
        }
    }
}

export const loadArticle = (id) => async dispatch => {
    try {
        dispatch(fetchArticleBegan());
        const article = await articleService.fetchArticle(id)

        dispatch(articleFetched(article));
        dispatch(articleFetchErrorCleared());
    } catch (e) {
        dispatch(articleFetchFailed(formatError(e)));
    } finally {
        dispatch(articleFetchEnded());
    }
}

export const emptyUserArticles = () => dispatch => {
    dispatch(profileArticlesEmptied());
}

export const likeOrUnlikeArticle = (article) => async dispatch => {
    try {
        dispatch(likeBegan(article))
        const updatedArticle = !article.is_liked
            ? await articleService.likeArticle(article.id)
            : await articleService.unlikeArticle(article.id);

        dispatch(articleChanged(updatedArticle));
        dispatch(likeErrorCleared());
    } catch (e) {
        dispatch(likeFailed(formatError(e)));
    } finally {
        dispatch(likeEnded());
    }
}

export const filterArticles = (filterValue) => (dispatch, getState) => {
    dispatch(articlesFilteringBegan(filterValue));
}

export const filterProfileArticles = (filterValue) => dispatch => {
    dispatch(profileArticlesFilteringBegan(filterValue));
}


export const incrementArticleViews = (id) => async dispatch => {
    try {
        dispatch(articleViewingBegan());
        const article = await articleService.incrementArticleViews(id);
        dispatch(articleChanged(article));
        dispatch(articleViewErrorCleared());
    } catch (e) {
        dispatch(articleViewingFailed(formatError(e)));
    } finally {
        dispatch(articleViewingEnded());
    }
}
