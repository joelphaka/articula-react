import axios from 'axios'
import {
    API_PROFILE,
    API_TIMELINE_ARTICLES,
} from './paths'

export function fetchProfile(username) {
    return axios.get(`${API_PROFILE}/${username}`).then(({data}) => data);
}

export function fetchUserArticles(username) {
    return axios.get(`${API_TIMELINE_ARTICLES}/${username}`).then(({data}) => data);
}

export default {
    fetchProfile,
    fetchUserArticles,
}