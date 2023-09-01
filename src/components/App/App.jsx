import './App.css';
import { useState, Suspense, useRef, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext/CurrentUserContext';
import { Route, Routes } from 'react-router-dom';
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

function App() {
  const [ currentUser, setCurrentUser ] = useState({
    name: 'Виталий',
    email: 'pochta@yandex.ru',
    isLoggedIn: false
  });
  const [ deviceType, setDeviceType ] = useState(DEVICE.DESKTOP.NAME);
  const resizeDebounce = useRef(null);

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

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <DeviceTypeContext.Provider value={deviceType}>
        <Suspense fallback={<Preloader/>}>
          <Routes>
            <Route path={ROUTER.LANDING} element={<LandingAsync/>}/>
            <Route path={ROUTER.MOVIES} element={<MoviesAsync/>}/>
            <Route path={ROUTER.SAVED_MOVIES} element={<SavedMoviesAsync/>}/>
            <Route path={ROUTER.PROFILE} element={<ProfileAsync/>}/>
            <Route path={ROUTER.SIGNIN} element={<SigninAsync page={'signin'}/>}/>
            <Route path={ROUTER.SIGNUP} element={<SignupAsync page={'signup'}/>}/>
            <Route path={ROUTER.NOT_FOUND} element={<NotFoundAsync/>}/>
          </Routes>
        </Suspense>
      </DeviceTypeContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
