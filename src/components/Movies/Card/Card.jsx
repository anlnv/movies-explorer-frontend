import './Card.css';
import { useLocation } from 'react-router-dom';
import { API, ROUTER } from '../../../utils/config';

const Card = ({ card, isSaved, onSaveMovie, onDeleteMovie }) => {
  const { pathname } = useLocation();
  const isMainPage = pathname === ROUTER.MOVIES;
  const isSavedPage = pathname === ROUTER.SAVED_MOVIES;

  const convertDuration = (duration) => {
    return `${Math.floor(duration / 60)}ч ${duration % 60}м`;
  };

  const convertImageSrc = (card) => {
    if (isMainPage) {
      return API.BEAT_URL + card.image.url;
    } else {
      return card.image;
    }
  };

  const openMovieTrailer = (card) => {
    window.open(card.trailerLink, '_blank');
  };

  return (
    <li className={'card'}>
      <div className={'card__heading'}>
        <h2 className={'card__title'}>
          {card.nameRU}
        </h2>
        <p className={'card__duration'}>
          {convertDuration(card.duration)}
        </p>
      </div>
      <img className={'card__img'} src={convertImageSrc(card)} alt={card.nameRU}
           onClick={() => openMovieTrailer(card)} />
      <div className={'card__btn-wrapper'}>
        {isMainPage && !isSaved &&
          <button
            className={'card__button card__button_type_not-saved btn-hover'}
            type={'button'}
            onClick={() => onSaveMovie(card)}
          >Сохранить</button>
        }

        {isMainPage && isSaved &&
          <button
            className={'card__button card__button_type_saved btn-hover'}
            type={'button'}
            onClick={() => onDeleteMovie(card._id)}
          />
        }
        {isSavedPage &&
          <button
            className={'card__button card__button_type_delete btn-hover'}
            type={'button'}
            onClick={() => onDeleteMovie(card._id)}
          />
        }
      </div>
    </li>
  );
};

export default Card;
