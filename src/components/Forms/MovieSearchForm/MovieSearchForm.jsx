import './MovieSearchForm.css';
import SectionContainer from '../../Widgets/SectionContainer/SectionContainer';

const MovieSearchForm = () => {

  return (
    <section className={'search flex-center'} aria-label={'Форма поиска фильмов'}>
      <SectionContainer parent={'search'} mods={[ 'fd-column', 'ai-center' ]}>
        <form className={'search__form'}>
          <div className={'search__label'}>
            <input
              className={'search__input'}
              type={'text'}
              name={'search'}
              placeholder={'Фильм'}
              id={'search'}
              autoComplete={'off'}
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
                defaultChecked={true}
              />
              <span className={'search__checkbox-span'}/>
            </label>
            <p className={'search__checkbox-title'}>Короткометражки</p>
          </div>
        </form>
      </SectionContainer>
    </section>
  );
};

export default MovieSearchForm;
