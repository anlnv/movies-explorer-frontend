import { Navigate, Outlet } from 'react-router-dom';
import { ROUTER } from '../../../utils/config';
import { useContext } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext/CurrentUserContext';

function ProtectedRoute() {
  const { currentUser } = useContext(CurrentUserContext);

  return currentUser.isLoggedIn
    ? <Outlet />
    : <Navigate to={ROUTER.LANDING} replace />;
}

export default ProtectedRoute;
