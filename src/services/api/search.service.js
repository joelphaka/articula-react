import axios from 'axios'
import {
    API_SEARCH_ARTICLES,
    API_SEARCH_PEOPLE
} from "./paths";

export function searchUsers(params = {}) {
    return axios.get(API_SEARCH_ARTICLES, {params}).then(({data}) => data);
}

export function searchArticles(params = {}) {
    return axios.get(API_SEARCH_PEOPLE, {params}).then(({data}) => data);
}

export default {
    searchUsers,
    searchArticles,
}