import React, { useState } from 'react'
import { reduxForm } from 'redux-form'
import ComponentRender from './component-render'
import { FORM_NAME } from './const'
import getErrorMessage from './common/get-error-massage'
import getLoader from '../../../common/loader'
import { validate } from './common/validate'
import { getSchoolAttachedStatus, getSnilsUploadStatus } from './common/get-status'
import { connect } from 'react-redux'
import { allRegionsSelector, defaultPersonalDataValues, userSelector } from '../../../../redux/selectors'
import {
  loadDictionary,
  downloadSnils,
  personalDataStatusClean,
  loadProfile,
  updateProfile
} from '../../../../redux/action-creators'
import { compose, lifecycle } from 'recompose'

function NewPersonalData (props) {
  const {user, regions} = props

  const [changePasswordIsOpen, setChangePasswordIsOpen] = useState(false)
  const [changeEmailIsOpen, setChangeEmailIsOpen] = useState(false)
  const [uploadSnilsIsOpen, setUploadSnilsIsOpen] = useState(false)


  console.log(props.pristine, props)

  const renderProps = {
    openChangePassword: () => setChangePasswordIsOpen(true),
    openUploadSnils: () => setUploadSnilsIsOpen(true),
    openChangeEmail: () => setChangeEmailIsOpen(true),
    handleSubmit: () => props.handleSubmit((data, dispatch, props) => props.updateProfile({data})),
    downloadSnils: () => props.downloadSnils(),
    getSnilsUploadStatus: () => getSnilsUploadStatus(props.user.profile.personalData.snilsPdfUploaded),
    getSchoolAttachedStatus: () => getSchoolAttachedStatus(props.activeSchool),
    disableFormSubmit: props.invalid || props.pristine,
    disableSnilsDownload: !user.profile.personalData.snilsPdfUploaded,
    regions: regions.entities,
    loader: getLoader(user.profileLoading, user.profileUpdating, regions.loading),
    errorMessage: getErrorMessage(user.profileLoadError, user.profileUpdateError, regions.loadError),
    changePasswordIsOpen,
    setChangePasswordIsOpen,
    uploadSnilsIsOpen,
    setUploadSnilsIsOpen,
    changeEmailIsOpen,
    setChangeEmailIsOpen
  }

  return (
    <ComponentRender { ...renderProps }/>
  )
}

export default compose(
  connect(
    state => ({
      initialValues: defaultPersonalDataValues(state),
      user: userSelector(state),
      regions: allRegionsSelector(state)
    }), {
      loadProfile, updateProfile, personalDataStatusClean, downloadSnils, loadDictionary
    }),
  lifecycle({
    componentDidMount () {
      !this.props.user.profileLoaded && !this.props.user.profileLoading && this.props.loadProfile()
      !this.props.regions.entities.length && this.props.loadDictionary()
    },
    componentWillUnmount () {
      this.props.personalDataStatusClean()
    }
  }),
  reduxForm({
    form: FORM_NAME, validate, enableReinitialize: true, keepDirtyOnReinitialize: true
  })
)(NewPersonalData)