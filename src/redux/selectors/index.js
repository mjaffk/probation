export const regionsSelector = (state) => state.regions.regions
export const loadingRegionsSelector = (state) => state.regions.loading
export const regionsLoadErrorSelector = (state) => state.regions.error

export const captchaSelector = (state) => state.captcha.image
export const uuidSelector = (state) => state.captcha.uuid
export const loadingCaptchaSelector = (state) => state.captcha.loading
export const captchaLoadErrorSelector = (state) => state.captcha.error

export const userEmailSelector = (state) => state.user.email
export const userRegisteringSelector = (state) => state.user.registering
export const userRegistrationErrorSelector = (state) => state.user.registerError

export const userAuthorizingSelector = (state) => state.user.authorizing
export const userAuthorizeErrorSelector = (state) => state.user.authorizeError

export const passwordRecoveringSelector = (state) => state.user.passwordRecovering
export const passwordRecoveredSelector = (state) => state.user.passwordRecovered
export const passwordRecoveryErrorSelector = (state) => state.user.passwordRecoveryError
