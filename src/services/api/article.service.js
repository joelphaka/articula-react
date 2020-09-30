import axios from 'axios'
import { API_ARTICLES } from './paths'

export function fetchArticles(query = {}) {
    return axios.get(`${API_ARTICLES}`, {params: query}).then(({data}) => data);
}

export function fetchArticle(id) {
    return axios.get(`${API_ARTICLES}/${id}`).then(({data}) => data);
}

export function createArticle(data) {
    return axios.post(`${API_ARTICLES}`, data).then(({data}) => data);
}

export function updateArticle(data) {
    return axios.put(`${API_ARTICLES}/${data.id}`, data).then(({data}) => data);
}

export function deleteArticle(id) {
    return axios.put(`${API_ARTICLES}/${id}`).then(({data}) => data);
}

export function incrementArticleViewCount(id) {
    return axios.post(`${API_ARTICLES}/increment-view-count/${id}`).then(({data}) => data);
}

export default {
    fetchArticles,
    fetchArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    incrementArticleViewCount,
}