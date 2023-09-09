import './App.css';
import { useState, Suspense, useRef, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext/CurrentUserContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LandingAsync } from '../../pages/Landing/Landing.async';
import Preloader from '../Widgets/Preloader/Preloader';
import { DEVICE, ROUTER } from '../../utils/config';
import { MoviesAsync } from '../../pages/Movies/Movies.async';
import { SavedMoviesAsync } from '../../pages/SavedMovies/SavedMovies.async';
import { ProfileAsync } from '../../pages/Profile/Profile.async';
import { SigninAsync } from '../../pages/Signin/Signin.async';
import { SignupAsync } from '../../pages/Signup/Signup.async';
import { NotFoundAsync } from '../../pages/NotFound/NotFound.async';
import { DeviceTypeContext } from '../../contexts/DeviceTypeContext/DeviceTypeContext';
import { MAIN_API } from '../../utils/MainApi';
import { INITIAL_STATES, PAGE_NAME } from '../../utils/vars.global';
import ProtectedRoute from '../Shared/ProtectedRoute/ProtectedRoute';
import { MoviesContext } from '../../contexts/MoviesContext/MoviesContext';
import { InfoToolip } from '../Shared/InfoTooltip/InfoTooltip';

function App() {
  const [ currentUser, setCurrentUser ] = useState(INITIAL_STATES.CURRENT_USER);
  const [ deviceType, setDeviceType ] = useState(INITIAL_STATES.DEVICE);
  const [ movies, setMovies ] = useState(INITIAL_STATES.MOVIES);
  const [ popupStatus, setPopupStatus ] = useState(INITIAL_STATES.POPUP);
  const [ isLoading, setLoading ] = useState(false);
  const resizeDebounce = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleChangeDeviceType = () => {
      clearTimeout(resizeDebounce.current);

      resizeDebounce.current = setTimeout(() => {
        if (window.innerWidth > DEVICE.TABLET.WIDTH) {
          setDeviceType(DEVICE.DESKTOP.NAME);
        } else if (window.innerWidth > DEVICE.MOBILE.WIDTH) {
          setDeviceType(DEVICE.TABLET.NAME);
        } else {
          setDeviceType(DEVICE.MOBILE.NAME);
        }
      }, 300);
    };

    handleChangeDeviceType();

    window.addEventListener('resize', handleChangeDeviceType);

    return () => {
      clearTimeout(resizeDebounce.current);
      window.removeEventListener('resize', handleChangeDeviceType);
    };
  }, [ deviceType ]);

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      MAIN_API.getUserData()
        .then(({ name, email }) => {
          setCurrentUser((u) => ({ ...u, name, email }));
        })
        .catch((e) => {
          console.error(e);
          localStorage.clear();
          setCurrentUser({ isLoggedIn: false });
          navigate(ROUTER.LANDING, { replace: true });
        });
      setLoading(true);
      MAIN_API.getMovies()
        .then((movies) => setMovies((m) => ({ ...m, saved: movies })))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [ currentUser.isLoggedIn ]);

  const handleClosePopup = () => {
    setPopupStatus((p) => ({ ...p, isOpen: false }));
  };

  const handleOpenPopup = ({ title, message }) => {
    setPopupStatus({
      title,
      message,
      isOpen: true,
    });
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <DeviceTypeContext.Provider value={deviceType}>
        <MoviesContext.Provider value={{ movies, setMovies }}>
          <InfoToolip popupStatus={popupStatus} onClose={handleClosePopup} />
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path={ROUTER.MOVIES}
                       element={<MoviesAsync handleResponse={handleOpenPopup} />} />
                <Route path={ROUTER.SAVED_MOVIES}
                       element={<SavedMoviesAsync handleResponse={handleOpenPopup}
                                                  isLoading={isLoading} />} />
                <Route path={ROUTER.PROFILE}
                       element={<ProfileAsync handleResponse={handleOpenPopup} />} />
              </Route>
              <Route path={ROUTER.LANDING} element={<LandingAsync />} />
              <Route path={ROUTER.SIGNIN}
                     element={<SigninAsync page={PAGE_NAME.SIGNIN}
                                           handleResponse={handleOpenPopup} />} />
              <Route path={ROUTER.SIGNUP}
                     element={<SignupAsync page={PAGE_NAME.SIGNUP}
                                           handleResponse={handleOpenPopup} />} />
              <Route path={ROUTER.NOT_FOUND} element={<NotFoundAsync />} />
            </Routes>
          </Suspense>
        </MoviesContext.Provider>
      </DeviceTypeContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
