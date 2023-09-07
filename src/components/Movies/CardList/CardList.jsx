import './CardList.css';
import Card from '../Card/Card';
import { useLocation } from 'react-router-dom';
import { DEVICE, ROUTER } from '../../../utils/config';
import { useContext, useEffect, useState } from 'react';
import { DeviceTypeContext } from '../../../contexts/DeviceTypeContext/DeviceTypeContext';

const CardList = ({
                    movies,
                    savedMovies,
                    searchError,
                    page,
                    setPage,
                    onSaveMovie,
                    onDeleteMovie
                  }) => {
  const { pathname } = useLocation();
  const device = useContext(DeviceTypeContext);
  const isMainPage = pathname === ROUTER.MOVIES;
  const [ toRender, setToRender ] = useState(12);
  const [ isRenderPaginationBtn, setRenderPaginationBtn ] = useState(false);

  useEffect(() => {
    movies.length > toRender ? setRenderPaginationBtn(true) : setRenderPaginationBtn(false);
    setToRender(DEVICE[device.toUpperCase()].RENDER.INIT + DEVICE[device.toUpperCase()].RENDER.MORE * page);
  }, [ movies, toRender, page, device ]);

  const handlePage = () => {
    setPage((last) => last + 1);
  };

  const isSavedCard = (movie) => {
    return savedMovies.reduce((isLiked, savedMovie) => {
      if (savedMovie.movieId === movie.id) {
        movie._id = savedMovie._id;
        return true;
      }
      return isLiked;
    }, false);
  };

  const renderCards = () => {
    return isMainPage
      ? movies.slice(0, toRender).map((card) => {
        return (
          <Card
            key={card.id}
            card={card}
            isSaved={isSavedCard(card)}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
          />
        );
      })
      : movies.map((card) => {
        return (
          <Card key={card._id} card={card} onDeleteMovie={onDeleteMovie} />
        );
      });
  };

  return (
    <section className={`cards flex-center ${!isMainPage && 'cards_type_saved'}`}>
      <div>
        <h1 className={'cards__error-text'}>{searchError}</h1>
      </div>
      <ul className={'cards__list'}>
        {renderCards()}
      </ul>
      {isMainPage && isRenderPaginationBtn &&
        <button type={'button'} className={'cards__more btn-hover'}
                onClick={handlePage}>Ещё</button>}
    </section>
  );
};

export default CardList;
