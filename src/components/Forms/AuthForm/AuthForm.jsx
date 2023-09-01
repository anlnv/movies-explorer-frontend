import './AuthForm.css';
import Logo from '../../Widgets/Logo/Logo';
import signup from '../../../pages/Signup/Signup';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTER } from '../../../utils/config';
import useFormAndValidation from '../../../hooks/useFormAndValidation';
import { useContext } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext/CurrentUserContext';

const AuthForm = ({ page }) => {
  const {
    values,
    errors,
    // setErrors,
    // isValid,
    handleChange,
    // resetForm,
    // setValues,
    // setValid,
  } = useFormAndValidation();
  const { setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentUser((u) => ({ ...u, isLoggedIn: true }));
    navigate(ROUTER.MOVIES, { replace: true });
  };

  return (
    <section className={'auth'}>
      <form className={'auth__form'} onSubmit={handleSubmit}>
        <div className={'auth__header'}>
          <Logo/>
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
              onChange={handleChange}
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
        <div className={'auth__btn-wrapper'}>
          <button
            type={'submit'}
            className={`auth__submit btn-hover`}
          >
            {render.submitButton[page]}
          </button>
          <p className={'auth__question'}>{render.question[page]}{render.link[page]}</p>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
