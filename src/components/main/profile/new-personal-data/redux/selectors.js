// import {ROLE_DICTIONARY} from "../../../../../constants"

export const profileLoadingSelector = (state) => state.profileLoading
export const profileLoadedSelector = (state) => state.profileLoaded
export const profileLoadErrorSelector = (state) => state.profileLoadError

export const profileUpdatingSelector = (state) => state.profileUpdating
export const profileUpdateErrorSelector = (state) => state.profileUpdateError

export const userIdSelector = (state) => state.userId
export const userEmailSelector = (state) => state.email
export const userActiveSchoolSelector = (state) => state.profile.activeSchool
export const userSnilsPdfUploadedSelector = (state) => state.profile.personalData.snilsPdfUploaded
export const userEmailConfirmedSelector = (state) => state.profile.emailConfirmed

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