import './SavedMovies.css';
import Header from '../../components/Widgets/Header/Header';
import MovieSearchForm from '../../components/Forms/MovieSearchForm/MovieSearchForm';
import CardList from '../../components/Movies/CardList/CardList';
import Footer from '../../components/Widgets/Footer/Footer';
import { useContext } from 'react';
import { MoviesContext } from '../../contexts/MoviesContext/MoviesContext';
import { useSearch } from '../../hooks/useSearch';
import Preloader from '../../components/Widgets/Preloader/Preloader';
import { MAIN_API } from '../../utils/MainApi';
import { POPUP_MESSAGES } from '../../utils/vars.global';

const SavedMovies = ({ handleResponse, isLoading }) => {
  const { movies, setMovies } = useContext(MoviesContext);
  const {
    filteredMovies,
    query,
    setQuery,
    searchError,
    isSearchLoading,
    handleSearch
  } = useSearch({
    movies: movies.saved,
    isMoviesPage: false,
    isSavedMoviesPage: true,
  });

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
          onSearch={handleSearch}
          query={query}
          setQuery={setQuery}
          handleResponse={handleResponse}
        />
        {
          isSearchLoading || isLoading
            ? <Preloader />
            : <CardList
              movies={filteredMovies}
              savedMovies={movies.saved}
              searchError={searchError}
              onDeleteMovie={handleDeleteMovie}
            />
        }
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
