import './MovieSearchForm.css';
import SectionContainer from '../../Widgets/SectionContainer/SectionContainer';
import { useContext } from 'react';
import { MoviesContext } from '../../../contexts/MoviesContext/MoviesContext';
import { useLocation } from 'react-router-dom';
import { ROUTER } from '../../../utils/config';
import { POPUP_MESSAGES } from '../../../utils/vars.global';

const MovieSearchForm = ({ query, setQuery, getMovies, onSearch, handleResponse }) => {
  const { movies } = useContext(MoviesContext);
  const { pathname } = useLocation();
  const isMoviesPage = pathname === ROUTER.MOVIES;

  const handleChange = (e) => {
    setQuery((q) => ({ ...q, string: e.target.value }));
  };

  const handleCheckboxChange = async (e) => {
    if (!query.string && isMoviesPage) {
      return handleResponse({
        title: POPUP_MESSAGES.FAIL.SEARCH.TITLE,
        message: POPUP_MESSAGES.FAIL.SEARCH.MESSAGE_SORT_EMPTY_STRING,
      });
    }

    setQuery((q) => ({ ...q, isShort: e.target.checked }));

    if (isMoviesPage) {
      const movieList = await getMovies();
      onSearch(movieList, {
        string: query.string,
        isShort: e.target.checked
      });
    } else {
      onSearch(movies.saved, {
        string: query.string,
        isShort: e.target.checked
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isMoviesPage) {
      if (!query.string) {
        return handleResponse({
          title: POPUP_MESSAGES.FAIL.SEARCH.TITLE,
          message: POPUP_MESSAGES.FAIL.SEARCH.MESSAGE_WITH_EMPTY_STRING,
        });
      }
      const movieList = await getMovies();
      onSearch(movieList, query);
    } else {
      onSearch(movies.saved, query);
    }
  };

  return (
    <section className={'search flex-center'} aria-label={'Форма поиска фильмов'}>
      <SectionContainer parent={'search'} mods={[ 'fd-column', 'ai-center' ]}>
        <form className={'search__form'} noValidate onSubmit={handleSubmit}>
          <div className={'search__label'}>
            <input
              className={'search__input'}
              type={'text'}
              name={'search'}
              placeholder={'Фильм'}
              id={'search'}
              autoComplete={'off'}
              value={query.string}
              onChange={handleChange}
              required
            />
            <button type={'submit'} className={'search__btn btn-hover'}>Поиск</button>
          </div>
          <div className={'search__checkbox-wrapper'}>
            <label className={'search__checkbox-label'} htmlFor={'checkbox'}>
              <input
                type={'checkbox'}
                id={'checkbox'}
                className={'search__checkbox'}
                checked={query.isShort}
                onChange={handleCheckboxChange}
              />
              <span className={'search__checkbox-span'} />
            </label>
            <p className={'search__checkbox-title'}>Короткометражки</p>
          </div>
        </form>
      </SectionContainer>
    </section>
  );
};

export default MovieSearchForm;
