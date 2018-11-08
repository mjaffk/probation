import React/* , { useEffect, useReducer, useState } */ from 'react';
import { reduxForm } from 'redux-form';
// import reducer from './redux/reducer';
import ComponentRender from './component-render';
// import initialState from './redux/initial-state';
// import { MODAL_STYLE } from '../../../../constants';
// import AlertModal from '../../../common/modals/alert-modal';
// import Loader from '../../../common/loader';
// import UploadSnils from '../personal-data/upload-snils';
// import ChangePassword from '../personal-data/change-password';
// import ChangeEmail from '../personal-data/change-email';
// import {
//   loadPersonalData, updatePersonalData, cleanStatusPersonalData, downloadSnils,
// } from './redux/actions';
// import { getSchoolAttachedStatus, getSnilsUploadStatus } from './common/get-status';
import { FORM_NAME } from './const';


function NewPersonalData() {
  // const [state, dispatch] = useReducer(reducer, initialState)
  //
  // const [changePasswordIsOpen, setChangePasswordIsOpen] = useState(false)
  // const [changeEmailIsOpen, setChangeEmailIsOpen] = useState(false)
  // const [uploadSnilsIsOpen, setUploadSnilsIsOpen] = useState(false)
  //
  // const [] = useEffect()
  //

  const renderProps = {
    // handleSubmit: () => {},
    // openChangePassword: () => setChangePasswordIsOpen(true),
    // openUploadSnils: () => setChangeEmailIsOpen(true),
    // openChangeEmail: () => setUploadSnilsIsOpen(true),
    // downloadSnils: () => dispatch(downloadSnils()),
    // getSnilsUploadStatus: () =>	getSnilsUploadStatus(),
    // getSchoolAttachedStatus: () => getSchoolAttachedStatus(),
    // disableFormSubmit: () => false,
    // disableSnilsDownload: () => state.profile.personalData.snilsPdfUploaded,
    regions: [],
  };
  return (
    <ComponentRender {...renderProps}>
      {/* {this.isLoading() && <Loader/>} */}
      {/* <ChangePassword isOpen={changePasswordIsOpen} */}
      {/* onAfterClose={() => setChangePasswordIsOpen(false)}/> */}
      {/* <UploadSnils isOpen={uploadSnilsIsOpen} onAfterClose={() => setChangeEmailIsOpen(false)}/> */}
      {/* <ChangeEmail isOpen={changeEmailIsOpen} onAfterClose={() => setUploadSnilsIsOpen(false)}/> */}
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
