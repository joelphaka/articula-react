import _api from './api'
import _httpService from './http.service'
import _storageService from './storage.service'

export const api                = _api
export const httpService        = _httpService
export const storageService     = _storageService

export default {
    api,
    httpService,
    storageService,
}