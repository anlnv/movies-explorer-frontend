import { Link } from 'react-router-dom';
import { ROUTER } from '../../../../../utils/config';

const NavLanding = () => {
  return (
    <nav className={'navbar'}>
      <ul className={'navbar__list'}>
        <li>
          <Link
            to={ROUTER.SIGNUP}
            className={'navbar__link link-hover'}
          >
            Регистрация
          </Link>
        </li>
        <li>
          <Link
            to={ROUTER.SIGNIN}
            className={'navbar__link navbar__link_type_signin link-hover'}
          >
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavLanding;
