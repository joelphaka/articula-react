import axios from 'axios';
import {API_COMMENTS} from "./paths";

export function fetchComment(id) {
    return axios.get(`${API_COMMENTS}/${id}`).then(({data}) => data);
}

export function fetchComments(articleId) {
    return axios.get(`${API_COMMENTS}/article/${articleId}`).then(({data}) => data);
}

export function fetchReplies(commentId) {
    return axios.get(`${API_COMMENTS}/replies/${commentId}`).then(({data}) => data);
}

export function createComment(params) {
    return axios.post(`${API_COMMENTS}/${params.article_id}`, params).then(({data}) => data);
}

export function updateComment(params) {
    return axios.put(`${API_COMMENTS}/${params.comment_id}`, params).then(({data}) => data);
}

export function deleteComment(commentId) {
    return axios.delete(`${API_COMMENTS}/${commentId}`).then(({data}) => data);

}export function replyToComment(params) {
    return axios.post(`${API_COMMENTS}/reply/${params.comment_id}`).then(({data}) => data);
}

export default {
    fetchComment,
    fetchComments,
    fetchReplies,
    createComment,
    updateComment,
    deleteComment,
    replyToComment
}