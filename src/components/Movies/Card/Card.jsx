import './Card.css';
import { useLocation } from 'react-router-dom';
import { ROUTER } from '../../../utils/config';

const Card = ({ card }) => {
  const { pathname } = useLocation();


  return (
    <li className={'card'}>
      <div className={'card__heading'}>
        <h2 className={'card__title'}>
          {card.nameRU}
        </h2>
        <p className={'card__duration'}>
          {card.duration}
        </p>
      </div>
      <img className={'card__img'} src={card.img} alt={card.nameRU} />
      <div className={'card__btn-wrapper'}>
        {pathname === ROUTER.MOVIES && !card.isLiked &&
          <button
            className={'card__button card__button_type_not-saved btn-hover'}
            type={'button'}
          >Сохранить</button>
        }

        {pathname === ROUTER.MOVIES && card.isLiked &&
          <button
            className={'card__button card__button_type_saved btn-hover'}
            type={'button'}
          />
        }
        {pathname === ROUTER.SAVED_MOVIES &&
          <button
            className={'card__button card__button_type_delete btn-hover'}
            type={'button'}
          />
        }
      </div>
    </li>
  );
};

export default Card;
