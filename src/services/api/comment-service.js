import axios from 'axios';
import {
    API_COMMENTS,
    API_LIKES_LIKE_COMMENT,
    API_LIKES_UNLIKE_COMMENT
} from "./paths";

export function fetchComment(id) {
    return axios.get(`${API_COMMENTS}/${id}`).then(({data}) => data);
}

export function fetchComments(articleId, params={}) {
    return axios.get(`${API_COMMENTS}/article/${articleId}`, {params}).then(({data}) => data);
}

export function fetchReplies(commentId, params = {}) {
    return axios.get(`${API_COMMENTS}/replies/${commentId}`, {params}).then(({data}) => data);
}

export function createComment(params) {
    return axios.post(`${API_COMMENTS}/${params.article_id}`, params).then(({data}) => data);
}

export function updateComment(params) {
    return axios.put(`${API_COMMENTS}/${params.id}`, params).then(({data}) => data);
}

export function deleteComment(id) {
    return axios.delete(`${API_COMMENTS}/${id}`).then(({data}) => data);
}

export function replyToComment(params) {
    return axios.post(`${API_COMMENTS}/reply/${params.comment_id}`, params).then(({data}) => data);
}

export function likeComment(id) {
    return axios.post(`${API_LIKES_LIKE_COMMENT}/${id}`).then(({data}) => data);
}

export function unlikeComment(id) {
    return axios.post(`${API_LIKES_UNLIKE_COMMENT}/${id}`).then(({data}) => data);
}

export default {
    fetchComment,
    fetchComments,
    fetchReplies,
    createComment,
    updateComment,
    deleteComment,
    replyToComment,
    likeComment,
    unlikeComment,
}