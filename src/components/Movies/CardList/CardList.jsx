import './CardList.css';
import Card from '../Card/Card';
import { cards, savedCards } from '../../../utils/cards';
import { useLocation } from 'react-router-dom';
import { DEVICE, ROUTER } from '../../../utils/config';
import { useContext } from 'react';
import { DeviceTypeContext } from '../../../contexts/DeviceTypeContext/DeviceTypeContext';

const CardList = () => {
  const { pathname } = useLocation();
  const device = useContext(DeviceTypeContext);

  const isMainPage = pathname === ROUTER.MOVIES;

  const renderCards = () => {
    return isMainPage
      ? cards.slice(0, DEVICE[device.toUpperCase()].RENDER.INIT).map((card) => {
        return (
          <Card key={card.id} card={card}/>
        );
      })
      : savedCards.map((card) => {
        return (
          <Card key={card.id} card={card}/>
        );
      })
  };

  return (
    <section className={`cards flex-center ${!isMainPage && 'cards_type_saved'}`}>
      <ul className={'cards__list'}>
        {renderCards()}
      </ul>
      {isMainPage && <button type={'button'} className={'cards__more btn-hover'}>Ещё</button>}
    </section>
  );
};

export default CardList;
