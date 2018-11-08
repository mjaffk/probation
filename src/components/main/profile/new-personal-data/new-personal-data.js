import React, { useState, useReducer } from 'react'
import { reduxForm } from 'redux-form'
import ComponentRender from './component-render'
import UploadSnils from '../personal-data/upload-snils'
import ChangePassword from '../personal-data/change-password'
import ChangeEmail from '../personal-data/change-email'
import { FORM_NAME } from './const'
import reducer from './redux/reducer';
import initialState from './redux/initial-state';
// import { MODAL_STYLE } from '../../../../constants';
// import AlertModal from '../../../common/modals/alert-modal';
// import Loader from '../../../common/loader';
// import {
//   loadPersonalData, updatePersonalData, cleanStatusPersonalData, downloadSnils,
// } from './redux/actions';
// import { getSchoolAttachedStatus, getSnilsUploadStatus } from './common/get-status';

function NewPersonalData(props) {
  const [changePasswordIsOpen, setChangePasswordIsOpen] = useState(false)
  const [changeEmailIsOpen, setChangeEmailIsOpen] = useState(false)
  const [uploadSnilsIsOpen, setUploadSnilsIsOpen] = useState(false)

  const [state, dispatch] = useReducer(reducer, initialState)
  // const [] = useEffect()
  console.log(state)

  const renderProps = {
    openChangePassword: () => setChangePasswordIsOpen(true),
    openUploadSnils: () => setUploadSnilsIsOpen(true),
    openChangeEmail: () => setChangeEmailIsOpen(true),
    // handleSubmit: () => {},
    // downloadSnils: () => dispatch(downloadSnils()),
    // getSnilsUploadStatus: () =>	getSnilsUploadStatus(),
    // getSchoolAttachedStatus: () => getSchoolAttachedStatus(),
    disableFormSubmit: props.invalid || props.pristine,
    disableSnilsDownload: state.profile.personalData.snilsPdfUploaded,
    regions: [{index: '1', value: 'dkjfg'}],
  };
  return (
    <ComponentRender {...renderProps}>
      {/* {this.isLoading() && <Loader/>} */}
       <ChangePassword isOpen={changePasswordIsOpen} onAfterClose={() => setChangePasswordIsOpen(false)}/>
       <UploadSnils isOpen={uploadSnilsIsOpen} onAfterClose={() => setUploadSnilsIsOpen(false)}/>
       <ChangeEmail isOpen={changeEmailIsOpen} onAfterClose={() => setChangeEmailIsOpen(false)}/>
      {/* {this.getErrorMessage() && <AlertModal */}
      {/* style={MODAL_STYLE} */}
      {/* message={this.getErrorMessage()} */}
      {/* buttonLabel='Закрыть' */}
      {/* />} */}
    </ComponentRender>
  );
}

// const isLoading = () => {
// 	return this.props.regionsLoading || this.props.profileLoading || this.props.profileUpdating
// }

export default reduxForm({ form: FORM_NAME })(NewPersonalData);
