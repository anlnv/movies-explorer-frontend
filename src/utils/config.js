const ROUTER = {
  LANDING: '/',
  MOVIES: '/movies',
  SAVED_MOVIES: '/saved-movies',
  PROFILE: '/profile',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  NOT_FOUND: '*',
  GIT: 'https://github.com/anlnv',
  HOW_TO_LEARN: 'https://github.com/anlnv/how-to-learn',
  RUSSIAN_TRAVEL: 'https://github.com/anlnv/russian-travel',
  MESTO: 'https://github.com/anlnv/react-mesto-api-full-gha',
  YANDEX: 'https://practicum.yandex.ru'
};

const DEVICE = {
  DESKTOP: {
    WIDTH: 1280,
    NAME: 'desktop',
    RENDER: {
      INIT: 12,
      MORE: 3,
    }
  },
  TABLET: {
    WIDTH: 1100,
    NAME: 'tablet',
    RENDER: {
      INIT: 8,
      MORE: 2,
    }
  },
  MOBILE: {
    WIDTH: 620,
    NAME: 'mobile',
    RENDER: {
      INIT: 5,
      MORE: 2,
    }
  }
}

export {
  ROUTER,
  DEVICE,
};
