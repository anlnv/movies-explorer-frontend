import './AboutMe.css';
import SectionContainer from '../../Widgets/SectionContainer/SectionContainer';
import Title from '../Title/Title';
import { Link } from 'react-router-dom';
import { ROUTER } from '../../../utils/config';
import photo from '../../../assets/img/developer.png';

const AboutMe = () => {
  return (
    <section className={'about-me flex-center'}>
      <SectionContainer parent={'about-me'} mods={[ 'fd-column', 'mod-center' ]}>
        <Title>Студент</Title>
        <div className={'about-me__info-box'}>
          <div className={'about-me__student-wrapper'}>
            <h4 className={'about-me__name'}>Виталий</h4>
            <p className={'about-me__prof'}>Фронтенд-разработчик, 30 лет</p>
            <p className={'about-me__bio'}>Я родился и живу в Саратове, закончил факультет экономики
              СГУ. У меня есть
              жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
              С&nbsp;2015 года работал в
              компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
              фриланс-заказами и
              ушёл с постоянной работы.</p>
            <Link className={'about-me__link link-hover'} to={ROUTER.GIT}
                  target={'_blank'}>Github</Link>
          </div>
          <img className={'about-me__photo'} src={photo} alt={'Фотография студента'} />
        </div>
      </SectionContainer>
    </section>
  );
};

export default AboutMe;
