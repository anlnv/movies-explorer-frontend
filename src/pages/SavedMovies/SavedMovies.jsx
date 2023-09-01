import './SavedMovies.css';
import Header from '../../components/Widgets/Header/Header';
import MovieSearchForm from '../../components/Forms/MovieSearchForm/MovieSearchForm';
import CardList from '../../components/Movies/CardList/CardList';
import Footer from '../../components/Widgets/Footer/Footer';

const SavedMovies = () => {
  return (
    <>
      <Header/>
      <main>
        <MovieSearchForm/>
        <CardList/>
      </main>
      <Footer/>
    </>
  );
};

export default SavedMovies;
