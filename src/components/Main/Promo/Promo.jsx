import './Promo.css';
import SectionContainer from '../../Widgets/SectionContainer/SectionContainer';
import { Link } from 'react-scroll';

const Promo = () => {
  return (
    <section className={'promo flex-center'}>
      <SectionContainer parent={'promo'} mods={[ 'jc-sb', 'mod' ]}>
        <div className={'promo__content'}>
          <h1 className={'promo__title'}>Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className={'promo__subtitle'}>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <Link className={'promo__link link-hover'} to={'about'} smooth={true} duration={500} >Узнать больше</Link>
        </div>
        <div className={'promo__logo'}/>
      </SectionContainer>
    </section>
  );
};

export default Promo;
