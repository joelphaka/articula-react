import _authService from './auth.service'
import _articleService from './article.service'
import _profileService from './profile.service'
import _searchService from './search.service'


export const authService        = _authService;
export const articleService     = _articleService;
export const profileService     = _profileService;
export const searchService      = _searchService;

export default {
    authService,
    articleService,
    profileService,
    searchService,
}