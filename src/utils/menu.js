import { ROUTER } from './config';

const burgerMenu = [
  {
    name: 'Главная',
    link: ROUTER.LANDING,
  },
  {
    name: 'Фильмы',
    link: ROUTER.MOVIES,
  },
  {
    name: 'Сохранённые фильмы',
    link: ROUTER.SAVED_MOVIES,
  },
];

export {
  burgerMenu,
};
