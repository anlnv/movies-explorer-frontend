import './Navbar.css';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext/CurrentUserContext';
import NavLanding from './NavLanding/NavLanding';
import NavAuth from './NavAuth/NavAuth';
import NavBurger from './NavBurger/NavBurger';
import { DeviceTypeContext } from '../../../../contexts/DeviceTypeContext/DeviceTypeContext';
import { DEVICE } from '../../../../utils/config';

const Navbar = () => {
  const { isLoggedIn } = useContext(CurrentUserContext).currentUser;
  const deviceType = useContext(DeviceTypeContext);
  const isDesktop = deviceType === DEVICE.DESKTOP.NAME
  const [ isActiveBurgerMenu, setActiveBurgerMenu ] = useState(false);

  const handleActive = () => setActiveBurgerMenu(() => !isActiveBurgerMenu);

  return (
    <>
      {!isLoggedIn && <NavLanding/>}
      {isDesktop && isLoggedIn && <NavAuth isActiveBurger={isActiveBurgerMenu}/>}
      {isLoggedIn && !isDesktop && <NavBurger isActive={isActiveBurgerMenu} toggleActive={handleActive}/>}
      {!isDesktop && isLoggedIn && <button type={'button'} className={'burger-btn btn-hover'} onClick={handleActive}/>}
    </>
  );
};

export default Navbar;
