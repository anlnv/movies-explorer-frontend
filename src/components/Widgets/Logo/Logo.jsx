import './Logo.css';
import { useNavigate } from 'react-router-dom';
import { ROUTER } from '../../../utils/config';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className={'logo btn-hover'} onClick={() => navigate(ROUTER.LANDING)} />
  );
};

export default Logo;
