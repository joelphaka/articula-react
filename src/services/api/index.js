import _authService from './auth.service'
import _articleService from './article.service'
import _profileService from './profile.service'
import _searchService from './search.service'
import _avatarService from "./avatar.service"


export const authService        = _authService;
export const articleService     = _articleService;
export const profileService     = _profileService;
export const searchService      = _searchService;
export const avatarService      = _avatarService;

export default {
    authService,
    articleService,
    profileService,
    searchService,
    avatarService
}