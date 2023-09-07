const LOCAL_STORAGE_KEYS = {
  TOKEN: 'jwt',
  SEARCH: 'search',
};

const INITIAL_STATES = {
  CURRENT_USER: {
    name: '',
    email: '',
    isLoggedIn: !!localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)
  },
  DEVICE: 'desktop',
  MOVIES: {
    main: [],
    saved: [],
  },
  POPUP: {
    title: '',
    message: '',
    isOpen: false,
  }
};

const POPUP_MESSAGES = {
  SUCCESS: {
    REG: {
      TITLE: 'Добро пожаловать',
      MESSAGE: 'Регистрация прошла успешно. Воспользуйтесь поиском, чтобы начать пользоваться приложением 🧐',
    },
    PROFILE: {
      TITLE: 'Профиль',
      MESSAGE: 'Данные успешно обновлены!',
    }
  },
  FAIL: {
    REG: {
      TITLE: 'Регистрация',
    },
    AUTH: {
      TITLE: 'Авторизация',
    },
    SEARCH: {
      TITLE: 'Ошибка поиска',
      MESSAGE_WITH_EMPTY_STRING: 'Строка поиска не должна быть пустой.',
      MESSAGE_SORT_EMPTY_STRING: 'Для сортировки поисковый запрос не должен быть пуст.',
    },
    PROFILE: {
      TITLE: 'Ошибка профиля'
    },
    MOVIES: {
      FETCH: {
        TITLE: 'Загрузка фильмов',
        MESSAGE: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
      },
      SAVE: {
        TITLE: 'Сохранение фильма',
      },
      DELETE: {
        TITLE: 'Удаление фильма',
      }
    }
  }
};

const PAGE_NAME = {
  SIGNUP: 'signup',
  SIGNIN: 'signin',
};

export {
  LOCAL_STORAGE_KEYS,
  INITIAL_STATES,
  POPUP_MESSAGES,
  PAGE_NAME,
};
