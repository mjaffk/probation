export const regionsSelector = (state) => state.dictionary.regions
export const loadingRegionsSelector = (state) => state.dictionary.loading
export const loadedRegionsSelector = (state) => state.dictionary.loaded
export const regionsLoadErrorSelector = (state) => state.dictionary.error

export const captchaSelector = (state) => state.captcha.image
export const uuidSelector = (state) => state.captcha.uuid
export const loadingCaptchaSelector = (state) => state.captcha.loading
export const loadedCaptchaSelector = (state) => state.captcha.loaded
export const captchaLoadErrorSelector = (state) => state.captcha.error

export const userEmailSelector = (state) => state.user.email
export const userRegisteredSelector = (state) => state.user.registered
export const userRegisteringSelector = (state) => state.user.registering
export const userRegistrationErrorSelector = (state) => state.user.error

export const userAuthorizedSelector = (state) => state.user.authorized
export const userAuthorizingSelector = (state) => state.user.authorizing
export const userAuthorizeErrorSelector = (state) => state.user.error
