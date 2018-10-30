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
export const userRoleNameSelector = (state) => ROLE_DICTIONARY[state.user.role]
export const userRoleSelector = (state) => state.user.role
export const userEmailSelector = (state) => state.user.email
export const userMessageSelector = (state) => state.user.message
export const userActiveSchoolSelector = (state) => state.user.profile.activeSchool
export const userSnilsPdfUploadedSelector = (state) => state.user.profile.personalData.snilsPdfUploaded
export const userEmailConfirmedSelector = (state) => state.user.profile.emailConfirmed

export const userRegisteringSelector = (state) => state.user.registering
export const userRegisteredSelector = (state) => state.user.registered
export const userRegistrationErrorSelector = (state) => state.user.registerError

export const userAuthorizingSelector = (state) => state.user.authorizing
export const userAuthorizeErrorSelector = (state) => state.user.authorizeError

export const userActivatingSelector = (state) => state.user.activating
export const userActivateErrorSelector = (state) => state.user.activateError

export const passwordResettingSelector = (state) => state.password.passwordResetting
export const passwordResetSelector = (state) => state.password.passwordReset
export const passwordResetErrorSelector = (state) => state.password.passwordResetError

export const passwordSettingSelector = (state) => state.password.passwordSetting
export const passwordSetErrorSelector = (state) => state.password.passwordSetError

export const passwordChangingSelector = (state) => state.password.passwordChanging
export const passwordChangedErrorSelector = (state) => state.password.passwordChangeError

export const emailChangingSelector = (state) => state.email.emailChanging
export const emailChangedSelector = (state) => state.email.emailChanged
export const emailChangedErrorSelector = (state) => state.email.emailChangeError

export const emailConfirmingSelector = (state) => state.email.emailConfirming
export const emailConfirmErrorSelector = (state) => state.email.emailConfirmError

export const profileLoadingSelector = (state) => state.user.profileLoading
export const profileLoadedSelector = (state) => state.user.profileLoaded
export const profileLoadErrorSelector = (state) => state.user.profileLoadError

export const profileUpdatingSelector = (state) => state.user.profileUpdating
export const profileUpdateErrorSelector = (state) => state.user.profileUpdateError

export const defaultPersonalDataValues = (state) => ({
	userId: userIdSelector(state),
	lastName: state.user.profile.personalData.lastName,
	firstName: state.user.profile.personalData.firstName,
	middleName: state.user.profile.personalData.middleName,
	birthday: state.user.profile.personalData.birthday,
	region: state.user.profile.personalData.region,
	city: state.user.profile.personalData.city,
	school: state.user.profile.personalData.school,
	grade: state.user.profile.personalData.grade,
	gradeLetter: state.user.profile.personalData.gradeLetter,
	phone: state.user.profile.phone,
	snils: state.user.profile.personalData.snils,
	email: userEmailSelector(state),
	gender: state.user.profile.personalData.gender
})