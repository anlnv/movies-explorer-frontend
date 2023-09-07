import './AuthForm.css';
import Logo from '../../Widgets/Logo/Logo';
import signup from '../../../pages/Signup/Signup';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ROUTER } from '../../../utils/config';
import useFormAndValidation from '../../../hooks/useFormAndValidation';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext/CurrentUserContext';
import { MAIN_API } from '../../../utils/MainApi';
import { LOCAL_STORAGE_KEYS, PAGE_NAME, POPUP_MESSAGES } from '../../../utils/vars.global';
import Preloader from '../../Widgets/Preloader/Preloader';
import AuthFormButtons from './AuthFormButtons/AuthFormButtons';

const AuthForm = ({ page, handleResponse }) => {
  const {
    values,
    errors,
    isValid,
    handleChange,
    handleChangeEmail,
  } = useFormAndValidation();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [ isLoading, setLoading ] = useState(false);

  const render = {
    title: {
      signin: 'Рады видеть!',
      signup: 'Добро пожаловать!'
    },
    submitButton: {
      signin: 'Войти',
      signup: 'Зарегистрироваться'
    },
    question: {
      signin: 'Ещё не зарегистрированы? ',
      signup: 'Уже зарегистрированы? '
    },
    link: {
      signin: <Link to={ROUTER.SIGNUP} className={'auth__link link-hover'}>Регистрация</Link>,
      signup: <Link to={ROUTER.SIGNIN} className={'auth__link link-hover'}>Войти</Link>
    }
  };

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const { token } = await MAIN_API.signin({ email, password });
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
      setCurrentUser((u) => ({ ...u, isLoggedIn: true }));
      navigate(ROUTER.MOVIES, { replace: true });
    } catch (e) {
      console.error(e);
      handleResponse({
        title: POPUP_MESSAGES.FAIL.AUTH.TITLE,
        message: e,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const regData = await MAIN_API.signup({ name, email, password });
      console.log('Регистрация прошла успешно:');
      console.table(regData);
      await handleLogin({ email, password });
      handleResponse({
        title: POPUP_MESSAGES.SUCCESS.REG.TITLE,
        message: POPUP_MESSAGES.SUCCESS.REG.MESSAGE,
      });
    } catch (e) {
      console.error(e);
      handleResponse({
        title: POPUP_MESSAGES.FAIL.REG.TITLE,
        message: e,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (page === PAGE_NAME.SIGNUP) {
      await handleRegister({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    } else {
      await handleLogin({
        email: values.email,
        password: values.password,
      });
    }
  };

  return currentUser.isLoggedIn
    ? <Navigate to={ROUTER.LANDING} replace={true} />
    : (
      <section className={'auth'}>
        <form className={'auth__form'} onSubmit={handleSubmit} noValidate>
          <div className={'auth__header'}>
            <Logo />
            <h1 className={'auth__title'}>
              {render.title[page]}
            </h1>
          </div>
          <div className={'auth__inputs'}>
            {page === 'signup' && <div className={'auth__data-wrapper'}>
              <span className={'auth__input-name'}>Имя</span>
              <input
                className={`auth__input`}
                type={'text'}
                name={'name'}
                placeholder={'Виталий'}
                value={values.name ?? ''}
                onChange={handleChange}
                minLength={2}
                maxLength={30}
                required={true}
              />
              <span className={'auth__input-error'}>{errors.name}</span>
            </div>}
            <div className={'auth__data-wrapper'}>
              <span className={'auth__input-name'}>E-mail</span>
              <input
                className={`auth__input`}
                type={'email'}
                name={'email'}
                placeholder={'pochta@yandex.ru'}
                value={values.email ?? ''}
                onChange={handleChangeEmail}
                minLength={2}
                maxLength={30}
                required={true}
              />
              <span className={'auth__input-error'}>{errors.email && 'Неверный формат почты'}</span>
            </div>
            <div className={'auth__data-wrapper'}>
              <span className={'auth__input-name'}>Пароль</span>
              <input
                className={`auth__input`}
                type={'password'}
                name={'password'}
                placeholder={'******'}
                value={values.password ?? ''}
                onChange={handleChange}
                minLength={6}
                maxLength={30}
                required={true}
              />
              <span className={'auth__input-error'}>{errors.password}</span>
            </div>
          </div>
          {
            isLoading
              ? <Preloader />
              : <AuthFormButtons isValid={isValid} render={render} page={page} />
          }
        </form>
      </section>
    );
};

export default AuthForm;
