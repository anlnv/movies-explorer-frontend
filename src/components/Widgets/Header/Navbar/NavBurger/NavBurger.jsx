import './NavBurger.css';
import { NavLink } from 'react-router-dom';
import { ROUTER } from '../../../../../utils/config';
import { burgerMenu } from '../../../../../utils/menu';

const NavBurger = ({ isActive, toggleActive }) => {

  return (
    <div className={'burger-menu'}>
      <div className={`${isActive ? 'burger-menu__overlay burger-menu__overlay_active' : 'burger-menu__overlay'}`} onClick={toggleActive}>
        <div className={`${isActive ? 'burger-menu__wrapper burger-menu__wrapper_active' : 'burger-menu__wrapper'}`}>
          <div className={'burger-menu__content'} onClick={(e) => e.stopPropagation()}>
            <button type={'button'} className={'burger-menu__close-btn btn-hover'} onClick={toggleActive}/>
            <ul className={'navbar__list navbar__list_type_burger'}>
              {burgerMenu.map((item) => {
                return (
                  <li className={'navbar__item'} key={item.link}>
                    <NavLink
                      className={({ isActive }) => {
                        return `navbar__link-auth link-hover ${isActive && 'navbar__link-auth_active'}`
                      }}
                      to={item.link}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
              })}
              <li className={'navbar__item'}>
                <NavLink
                  className={`navbar__link-auth navbar__link-auth_type_profile link-hover`}
                  to={ROUTER.PROFILE}
                >
                  Аккаунт
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBurger;
