import axios from "axios";
import {API_AVATARS} from "./paths"

export function uploadAvatar(file, onProgress = null) {
    const formData = new FormData();
    formData.append('avatar', file);

    return axios.post(API_AVATARS, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: onProgress
    }).then(({data}) => data)
}

export function removeAvatar() {
    return axios.delete(API_AVATARS).then(({data}) => data);
}

export default {uploadAvatar, removeAvatar}