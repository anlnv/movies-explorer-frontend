import { useEffect, useState } from 'react';
import { MOVIES_CONFIG } from '../utils/config';
import { LOCAL_STORAGE_KEYS } from '../utils/vars.global';

export const useSearch = ({ movies, setPage, isMoviesPage, isSavedMoviesPage }) => {
  const [ filteredMovies, setFilteredMovies ] = useState([]);
  const [ isSearchLoading, setSearchLoading ] = useState(false);
  const [ query, setQuery ] = useState({
    string: '',
    isShort: false,
    data: [],
  });
  const [ searchError, setSearchError ] = useState('');
  const regexForFilter = /[«»!@#$%^&*()_\-=+|\[\]:"№;?{}<>.,]/g;
  const searchStatuses = {
    nothing: 'Ничего не найдено... 👀',
    emptySavedMovieList: 'Нет сохранённых фильмов ￣\\_(ツ)_/￣',
    emptyLocalStorage: 'Введите запрос для просмотра фильмов'
  };

  useEffect(() => {
    // заполняем квери и список фильмов, если есть история поиска
    if (LOCAL_STORAGE_KEYS.SEARCH in localStorage && isMoviesPage) {
      const searchHistory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH));
      setQuery({
        string: searchHistory.string,
        isShort: searchHistory.isShort,
        data: searchHistory.data
      });
      setFilteredMovies(searchHistory.data);
    } else if (!localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH && isMoviesPage)) {
      setSearchError(searchStatuses.emptyLocalStorage);
    }
  }, [ isMoviesPage ]);

  useEffect(() => {
    if (isSavedMoviesPage) {
      setSearchError('');
      const newFilteredMovies = filterMovies(movies, query);
      setFilteredMovies(newFilteredMovies);
      if (newFilteredMovies.length === 0) {
        setSearchError(searchStatuses.nothing);
      }
      if (movies.length === 0) {
        setSearchError(searchStatuses.emptySavedMovieList);
      }
    }
  }, [ isSavedMoviesPage, movies ]);

  const convertString = (str) => {
    return str.trim().toUpperCase().replace(regexForFilter, '');
  };

  const filterMovies = (arr, query) => {
    if (query.isShort) {
      return arr
        .filter(movie => movie.duration <= MOVIES_CONFIG.SHORT_FILMS) // filter short films
        .filter(m => convertString(m.nameRU || m.nameEN).includes(convertString(query.string))); // filter film title with converted strings
    } else {
      return arr.filter(m => convertString(m.nameRU || m.nameEN).includes(convertString(query.string))); // filter film title with converted strings
    }
  };

  const handleSearch = (arr, query) => {
    // сбрасываем ошибку
    setSearchError('');
    // включаем лоудер
    setSearchLoading(true);
    // получаем новый массив с актуальным квери-запросом
    const newData = filterMovies(arr, query);
    // искуственная задержка поиска
    setTimeout(() => {
      // если массив пуст, запишем ошибку
      if (newData.length === 0) {
        setSearchError(searchStatuses.nothing);
      }
      // запишем новый список фильмов
      setFilteredMovies(newData);
      // выключим лоудер
      setSearchLoading(false);
    }, 200);
    // если страница бит-фильмов, то сбросим пагинацию и запишем данные в сторейдж
    if (isMoviesPage) {
      setPage(0);
      localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH, JSON.stringify({
        string: query.string,   // строка поиска
        isShort: query.isShort, // состояние чекбокса
        data: newData,          // массив найденных и отфильтрованных фильмов
      }));
    }
  };

  return {
    filteredMovies,
    query,
    setQuery,
    isSearchLoading,
    searchError,
    handleSearch,
  };
};
