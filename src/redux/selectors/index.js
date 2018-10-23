import {ROLE_DICTIONARY} from "../../constants"


export const regionsSelector = (state) => state.regions.regions.toArray()
export const loadingRegionsSelector = (state) => state.regions.loading
export const regionsLoadErrorSelector = (state) => state.regions.error

export const captchaSelector = (state) => state.captcha.image
export const uuidSelector = (state) => state.captcha.uuid
export const loadingCaptchaSelector = (state) => state.captcha.loading
export const captchaLoadErrorSelector = (state) => state.captcha.error

export const userIdSelector = (state) => state.user.userId
export const userTokenSelector = (state) => state.user.token
export const userEmailSelector = (state) => state.user.email
export const userRegisteringSelector = (state) => state.user.registering
export const userRegistrationErrorSelector = (state) => state.user.registerError
export const userRoleNameSelector = (state) => ROLE_DICTIONARY[state.user.role]
export const userRoleSelector = (state) => state.user.role

export const userAuthorizingSelector = (state) => state.user.authorizing
export const userAuthorizeErrorSelector = (state) => state.user.authorizeError

export const passwordRecoveringSelector = (state) => state.user.passwordRecovering
export const passwordRecoveredSelector = (state) => state.user.passwordRecovered
export const passwordRecoveryErrorSelector = (state) => state.user.passwordRecoveryError

export const profileLoadingSelector = (state) => state.user.profileLoading
export const profileLoadedSelector = (state) => state.user.profileLoaded
export const profileLoadErrorSelector = (state) => state.user.profileLoadError

export const defaultPersonalDataValues = (state) => ({
	userId: state.user.userId,
	lastName: state.user.profile.personalData.lastName,
	firstName: state.user.profile.personalData.firstName,
	middleName: state.user.profile.personalData.middleName,
	birthday: state.user.profile.personalData.birthday,
	region: state.user.profile.personalData.region,
	city: state.user.profile.personalData.region,
	school: state.user.profile.personalData.school,
	grade: state.user.profile.personalData.grade,
	gradeLetter: state.user.profile.personalData.gradeLetter,
	phone: state.user.profile.phone,
	email: state.user.email,
})