import './Movies.css';
import Header from '../../components/Widgets/Header/Header';
import MovieSearchForm from '../../components/Forms/MovieSearchForm/MovieSearchForm';
import CardList from '../../components/Movies/CardList/CardList';
import Footer from '../../components/Widgets/Footer/Footer';
import { useContext, useState } from 'react';
import { MoviesContext } from '../../contexts/MoviesContext/MoviesContext';
import { MOVIES_API } from '../../utils/MoviesApi';
import Preloader from '../../components/Widgets/Preloader/Preloader';
import { useSearch } from '../../hooks/useSearch';
import { MAIN_API } from '../../utils/MainApi';
import { API } from '../../utils/config';
import { POPUP_MESSAGES } from '../../utils/vars.global';

const Movies = ({ handleResponse }) => {
  const [ isFirstSearch, setFirstSearch ] = useState(true);
  const [ isLoading, setLoading ] = useState(false);
  const [ page, setPage ] = useState(0);
  const { movies, setMovies } = useContext(MoviesContext);
  const {
    filteredMovies,
    query,
    setQuery,
    searchError,
    isSearchLoading,
    handleSearch
  } = useSearch({
    movies: movies.main,
    setPage,
    isMoviesPage: true,
    isSavedMoviesPage: false,
  });

  const getMovies = async () => {
    setLoading(true);
    if (isFirstSearch) {
      try {
        const mainMovies = await MOVIES_API.getMovies();
        setMovies((m) => ({ ...m, main: mainMovies }));
        setFirstSearch(false);
        return mainMovies;
      } catch (e) {
        console.error(e);
        handleResponse({
          title: POPUP_MESSAGES.FAIL.MOVIES.FETCH.TITLE,
          message: POPUP_MESSAGES.FAIL.MOVIES.FETCH.MESSAGE,
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      return movies.main;
    }
  };

  const handleSaveMovie = async (movie) => {
    const dataForSave = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: API.BEAT_URL + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: API.BEAT_URL + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };
    try {
      const savedMovie = await MAIN_API.saveMovie(dataForSave);
      setMovies((m) => ({ ...m, saved: [ ...m.saved, savedMovie ] }));
    } catch (e) {
      handleResponse({
        title: POPUP_MESSAGES.FAIL.MOVIES.SAVE.TITLE,
        message: e,
      });
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await MAIN_API.deleteMovie(id);
      setMovies((m) => ({
        ...m,
        saved: m.saved.filter(movie => movie._id !== id),
      }));
    } catch (e) {
      handleResponse({
        title: POPUP_MESSAGES.FAIL.MOVIES.DELETE.TITLE,
        message: e,
      });
    }
  };

  return (
    <>
      <Header />
      <main>
        <MovieSearchForm
          getMovies={getMovies}
          onSearch={handleSearch}
          query={query}
          setQuery={setQuery}
          handleResponse={handleResponse}
        />
        {
          isLoading || isSearchLoading
            ? <Preloader />
            : <CardList
              movies={filteredMovies}
              savedMovies={movies.saved}
              searchError={searchError}
              page={page}
              setPage={setPage}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
            />
        }
      </main>
      <Footer />
    </>
  );
};

export default Movies;
