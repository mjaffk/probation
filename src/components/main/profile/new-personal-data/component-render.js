import React from 'react';
import PropTypes from 'prop-types';
import { GENDER_DICTIONARY, GRADE_DICTIONARY, GRADE_LETTER_DICTIONARY } from '../../../../constants';
import arrToObj from '../../../../utils/arr-to-obj';
import Input from '../../../common/input';
import Select from '../../../common/select';
import { required } from '../../../../utils/validate';
import { phoneMask, snilsMask } from './common/field-masks';
import { Button, Submit } from './common/buttons';
import './personal-data.css';
import ChangePassword from '../personal-data/change-password'
import UploadSnils from '../personal-data/upload-snils'
import ChangeEmail from '../personal-data/change-email'

function ComponentRender({
  handleSubmit, openChangePassword, getSnilsUploadStatus, downloadSnils, openChangeEmail, getSchoolAttachedStatus,
  disableFormSubmit, disableSnilsDownload, regions, openUploadSnils, loader, changePasswordIsOpen, errorMessage,
  setChangePasswordIsOpen, uploadSnilsIsOpen, setUploadSnilsIsOpen, changeEmailIsOpen, setChangeEmailIsOpen

}) {
  return (
    <div id="personal_data_form">

      { loader }
      <ChangePassword isOpen={ changePasswordIsOpen } onAfterClose={ () => setChangePasswordIsOpen(false) }/>
      <UploadSnils isOpen={ uploadSnilsIsOpen } onAfterClose={ () => setUploadSnilsIsOpen(false) }/>
      <ChangeEmail isOpen={ changeEmailIsOpen } onAfterClose={ () => setChangeEmailIsOpen(false) }/>
      { errorMessage }

      <form onSubmit={handleSubmit}>
        <h4>Идентификация в системе</h4>
        <hr />
        <label htmlFor="user_id">Логин</label>
        <div className="d-flex justify-content-between align-items-baseline flex-wrap mb-2">
          <Input name="userId" disabled id="user_id" className="flex-grow-1 mr-sm-5" />
          <Button
            title="Сменить пароль"
            className="mx-sm-5 btn-secondary flex-grow-0"
            onClick={openChangePassword}
          />
        </div>

        <h4>Персональные данные</h4>
        <hr />
        <Input name="lastName" label="Фамилия" id="last_name" disabled />
        <Input name="firstName" label="Имя" id="firs_name" disabled />
        <Input name="middleName" label="Отчество" id="middle_name" disabled />
        <Select
          name="gender"
          label="Пол"
          options={GENDER_DICTIONARY}
          validate={[required]}
          placeholder="Выберите"
          id="gender"
          className="required"
        />

        <label htmlFor="snils" className="required">СНИЛС</label>
        <div
          id="snils_section"
          className="d-flex justify-content-between align-items-start flex-wrap mb-2"
        >
          <div>
            <Input name="snils" id="snils" validate={[required]} className="flex-grow-1 mr-sm-5" {...snilsMask} />
            {getSnilsUploadStatus()}
          </div>
          <div className="btn-group flex-grow-0">
            <Button
              title="Загрузить СНИЛС"
              className="btn-success rounded-left mr-1"
              onClick={openUploadSnils}
            />
            <Button
              title="Выгрузить СНИЛС"
              className="btn-info rounded-right"
              disabled={disableSnilsDownload}
              onClick={downloadSnils}
            />
          </div>
        </div>

        <Input
          name="birthday"
          label="Дата рождения"
          type="date"
          className="required"
          validate={[required]}
          id="birthday"
        />
        <Select
          name="region"
          label="Регион проживания"
          options={regions}
          className="required"
          validate={[required]}
          id="region"
          placeholder="Выберите или введите"
        />
        <Input name="city" label="Населенный пункт" validate={[required]} className="required" id="city" />
        <Input
          name="school"
          label="Наименование учебного заведения"
          validate={[required]}
          className="required"
          id="school"
        />

        <div className="mb-3">{getSchoolAttachedStatus()}</div>

        <div id="user_grade">
          <Select
            name="grade"
            label="Класс"
            options={arrToObj(GRADE_DICTIONARY)}
            className="required"
            id="grade"
            validate={[required]}
            placeholder="Выберите класс"
          />
          <Select
            name="gradeLetter"
            label="Буква"
            options={arrToObj(GRADE_LETTER_DICTIONARY)}
            id="grade_letter"
            className="required"
            placeholder="Выберите букву класса"
            validate={[required]}
          />
        </div>

        <h4>Контактные данные</h4>
        <div>
          <Input name="phone" label="Телефон" type="tel" id="phone" disabled {...phoneMask} />

          <label htmlFor="email">Email</label>
          <div className="d-flex justify-content-between align-items-baseline mb-3 flex-wrap">
            <Input name="email" type="email" id="email" disabled className="flex-grow-1 mr-sm-5" />
            <Button
              title="Сменить Email"
              className="btn-secondary mx-sm-5 flex-grow-0"
              onClick={openChangeEmail}
            />
          </div>
        </div>
        <Submit title="Сохронить изменения" className="btn-primary" disabled={disableFormSubmit} />
      </form>
    </div>
  );
}

ComponentRender.PropTypes = {
  handleSubmit: PropTypes.func,
  openChangePassword: PropTypes.func,
  getSnilsUploadStatus: PropTypes.func,
  downloadSnils: PropTypes.func,
  openChangeEmail: PropTypes.func,
  getSchoolAttachedStatus: PropTypes.func,
  disableFormSubmit: PropTypes.func,
  disableSnilsDownload: PropTypes.func,
  openUploadSnils: PropTypes.func,
  regions: PropTypes.arrayOf(PropTypes.object),
};

export default ComponentRender;
