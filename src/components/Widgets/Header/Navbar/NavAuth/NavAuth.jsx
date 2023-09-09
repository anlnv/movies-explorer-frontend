import { NavLink } from 'react-router-dom';
import { ROUTER } from '../../../../../utils/config';
import { burgerMenu } from '../../../../../utils/menu';

const NavAuth = () => {
  const renderLinks = () => {
    return burgerMenu.toSpliced(0, 1).map(item => {
      return (
        <li key={item.link}>
          <NavLink
            className={({ isActive }) => {
              return `navbar__link-auth link-hover ${isActive && 'navbar__link-auth_active'}`;
            }}
            to={item.link}
          >
            {item.name}
          </NavLink>
        </li>
      );
    });
  };

  return (<nav className={'navbar'}>
    <ul className={`navbar__list navbar__list_type_auth`}>
      {renderLinks()}
      <li>
        <NavLink
          className={`navbar__link-auth navbar__link-auth_type_profile link-hover`}
          to={ROUTER.PROFILE}
        >
          Аккаунт
        </NavLink>
      </li>
    </ul>
  </nav>);
};

export default NavAuth;
