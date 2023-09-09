import './ProfileForm.css';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext/CurrentUserContext';
import useFormAndValidation from '../../../hooks/useFormAndValidation';
import { MAIN_API } from '../../../utils/MainApi';
import { useNavigate } from 'react-router-dom';
import { ROUTER } from '../../../utils/config';
import Preloader from '../../Widgets/Preloader/Preloader';
import ProfileButtons from './ProfileButtons/ProfileButtons';
import { POPUP_MESSAGES } from '../../../utils/vars.global';

const ProfileForm = ({ handleResponse }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [ isLoading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const {
    values,
    errors,
    isValid,
    handleChange,
    handleChangeEmail,
    setValues,
    setValid,
  } = useFormAndValidation(currentUser);

  useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) setValid(false);
  }, [ values ]);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [ currentUser, setValues ]);

  const handleProfileUpdate = async ({ name, email }) => {
    setLoading(true);
    try {
      const { user } = await MAIN_API.setUserData({ name, email });
      setCurrentUser((u) => ({ ...u, name: user.name, email: user.email }));
      handleResponse({
        title: POPUP_MESSAGES.SUCCESS.PROFILE.TITLE,
        message: POPUP_MESSAGES.SUCCESS.PROFILE.MESSAGE,
      });
    } catch (e) {
      console.error(e);
      handleResponse({
        title: POPUP_MESSAGES.FAIL.PROFILE.TITLE,
        message: e,
      });
      // вернем текущие значения при ошибке
      setValues({
        name: currentUser.name,
        email: currentUser.email,
      })
    } finally {
      setLoading(false);
    }
  };

  const handleSignout = () => {
    setCurrentUser({ isLoggedIn: false });
    localStorage.clear();
    navigate(ROUTER.LANDING, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleProfileUpdate({
      name: values.name,
      email: values.email,
    });
  };

  return (
    <main>
      <section className={'profile'}>
        <form className={'profile__form'} onSubmit={handleSubmit} noValidate>
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
                onChange={handleChangeEmail}
                minLength={2}
                maxLength={30}
                required={true}
              />
            </label>
            <span className={'profile__input-error'}>{errors.email}</span>
          </div>
          {
            isLoading
              ? <Preloader />
              : <ProfileButtons isValid={isValid} onSignout={handleSignout} />
          }
        </form>
      </section>
    </main>
  );
};

export default ProfileForm;
