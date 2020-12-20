import axios from 'axios';

import {
    API_ARTICLES,
    API_ARTICLES_VIEW,
    API_LIKES_LIKE_ARTICLE,
    API_LIKES_UNLIKE_ARTICLE
} from "./paths";
import {createFormData} from "../../lib/utils";

export function fetchArticles(query = {}) {
    return axios.get(`${API_ARTICLES}`, {params: query}).then(({data}) => data);
}

export function fetchArticle(id) {
    return axios.get(`${API_ARTICLES}/${id}`).then(({data}) => data);
}

export function createArticle(data, onProgress = null) {
    return axios.post(`${API_ARTICLES}`, createFormData(data), {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: onProgress
    }).then(({data}) => data);
}

export function updateArticle(data, onProgress = null) {
    return axios.post(`${API_ARTICLES}/${data.id}`, createFormData(data), {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: onProgress
    }).then(({data}) => data);
}

export function deleteArticle(id) {
    return axios.delete(`${API_ARTICLES}/${id}`).then(({data}) => data);
}

export function incrementArticleViews(id) {
    return axios.post(`${API_ARTICLES_VIEW}/${id}`).then(({data}) => data);
}

export function likeArticle(id) {
    return axios.post(`${API_LIKES_LIKE_ARTICLE}/${id}`).then(({data}) => data);
}

export function unlikeArticle(id) {
    return axios.post(`${API_LIKES_UNLIKE_ARTICLE}/${id}`).then(({data}) => data);
}

export default {
    fetchArticles,
    fetchArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    incrementArticleViews,
    likeArticle,
    unlikeArticle,
}