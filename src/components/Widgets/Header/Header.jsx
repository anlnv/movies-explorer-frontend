import './Header.css';
import { useLocation } from 'react-router-dom';
import { ROUTER } from '../../../utils/config';
import Logo from '../Logo/Logo';
import Navbar from './Navbar/Navbar';
import SectionContainer from '../SectionContainer/SectionContainer';

const Header = () => {
  const { pathname } = useLocation();
  const isPortfolioPage = pathname === ROUTER.LANDING;

  return (
    <header className={`${isPortfolioPage ? 'header header_landing' : 'header'} `}>
      <SectionContainer parent={'header'} mods={[ 'jc-sb' ]}>
        <Logo />
        <Navbar />
      </SectionContainer>
    </header>
  );
};

export default Header;
