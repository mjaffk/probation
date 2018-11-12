import { MODAL_STYLE } from '../../../../../constants'
import AlertModal from '../../../../common/modals/alert-modal'
import React from 'react'

const errorMessage = (errors) => errors.reduce(
  (errorToUser, error) => errorToUser + ((error && error.errorToUser && error.errorToUser + ' ') || ''), '')

export default (...errors) => errors.some((error) => !!error) &&
  <AlertModal style={MODAL_STYLE} message={errorMessage(errors)} buttonLabel='Закрыть'/>