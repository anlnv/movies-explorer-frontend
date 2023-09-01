import './ProfileForm.css';
import { useContext } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext/CurrentUserContext';
import useFormAndValidation from '../../../hooks/useFormAndValidation';

const ProfileForm = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const {
    values,
    errors,
    // setErrors,
    isValid,
    handleChange,
    // resetForm,
    // setValues,
    // setValid,
  } = useFormAndValidation(currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentUser((u) => ({ ...u, name: values.name, email: values.email }));
  };

  return (
    <main>
      <section className={'profile'}>
        <form className={'profile__form'} onSubmit={handleSubmit}>
          <h1 className={'profile__title'}>
            Привет, {currentUser.name}!
          </h1>
          <div className={'profile__data-wrapper'}>
            <label className={'profile__label'}>
              <span className={'profile__input-name'}>Имя</span>
              <input
                className={`profile__input ${errors.name && 'profile__input_type_error'}`}
                type={'text'}
                name={'name'}
                placeholder={'Имя пользователя'}
                value={values.name ?? ''}
                onChange={handleChange}
                minLength={2}
                maxLength={30}
                required={true}
              />
            </label>
            <span className={'profile__input-error'}>{errors.name}</span>
          </div>
          <div className={'profile__data-wrapper'}>
            <label className={'profile__label'}>
              <span className={'profile__input-name'}>E-mail</span>
              <input
                className={`profile__input ${errors.email && 'profile__input_type_error'}`}
                type={'email'}
                name={'email'}
                placeholder={'E-mail пользователя'}
                value={values.email ?? ''}
                onChange={handleChange}
                minLength={2}
                maxLength={30}
                required={true}
              />
            </label>
            <span className={'profile__input-error'}>{errors.email}</span>
          </div>
          <div className={'profile__btn-wrapper'}>
            <button
              className={`profile__btn ${!isValid ? 'profile__btn_disabled' : 'btn-hover'}`}
              type={'submit'}
              disabled={!isValid}
            >
              Редактировать
            </button>
            <button
              className={'profile__btn profile__btn_type_signout btn-hover'}
              type={'button'}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ProfileForm;
