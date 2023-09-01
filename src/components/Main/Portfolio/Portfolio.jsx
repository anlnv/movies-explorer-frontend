import './Portfolio.css';
import SectionContainer from '../../Widgets/SectionContainer/SectionContainer';
import { ROUTER } from '../../../utils/config';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  return (
    <section className={'portfolio flex-center'}>
      <SectionContainer parent={'portfolio'} mods={[ 'fd-column' ]}>
        <h4 className={'portfolio__title'}>Портфолио</h4>
        <ul className={'portfolio__list'}>
          <li className={'portfolio__item'}>
            <Link
              className={'portfolio__link link-hover'}
              to={ROUTER.HOW_TO_LEARN}
              target={'_blank'}>
              Статичный сайт <span className={'portfolio__span'}>↗</span>
            </Link>
          </li>
          <li className={'portfolio__item'}>
            <Link
              className={'portfolio__link link-hover'}
              to={ROUTER.RUSSIAN_TRAVEL}
              target={'_blank'}>
              Адаптивный сайт <span className={'portfolio__span'}>↗</span>
            </Link>
          </li>
          <li className={'portfolio__item'}>
            <Link
              className={'portfolio__link link-hover'}
              to={ROUTER.MESTO}
              target={'_blank'}>
              Одностраничное
              приложение <span className={'portfolio__span'}>↗</span>
            </Link>
          </li>
        </ul>
      </SectionContainer>
    </section>
  );
};

export default Portfolio;
