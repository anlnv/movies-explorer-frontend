import './NotFound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <main>
      <section className={'error-page'}>
        <div className={'error-page__wrapper'}>
          <h1 className={'error-page__status'}>
            404
          </h1>
          <p className={'error-page__message'}>
            Страница не найдена
          </p>
        </div>
        <button
          type={'button'}
          className={'error-page__btn btn-hover'}
          onClick={handleBack}
        >
          Назад
        </button>
      </section>
    </main>
  );
};

export default NotFound;
