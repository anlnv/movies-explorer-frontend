import './AboutProject.css';
import SectionContainer from '../../Widgets/SectionContainer/SectionContainer';
import Title from '../Title/Title';

const AboutProject = () => {
  return (
    <section className={'about flex-center'} id={'about'}>
      <SectionContainer parent={'about'} mods={[ 'fd-column' ]}>
        <Title>О проекте</Title>
        <ul className={'about__list'}>
          <li className={'about__item'}>
            <h3 className={'about__title'}>Дипломный проект включал 5 этапов</h3>
            <p className={'about__subtitle'}>
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
              финальные
              доработки.
            </p>
          </li>
          <li className={'about__item'}>
            <h3 className={'about__title'}>На выполнение диплома ушло 5 недель</h3>
            <p className={'about__subtitle'}>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
              успешно
              защититься.
            </p>
          </li>
        </ul>
        <ul className={'about__duration-list'}>
          <li className={'about__duration-item'}>
            <p className={'about__duration'}>1 неделя</p>
            <span className={'about__duration-name'}>Back-end</span>
          </li>
          <li className={'about__duration-item'}>
            <p className={'about__duration about__duration_type_frontend'}>
              4 недели
            </p>
            <span className={'about__duration-name'}>Front-end</span>
          </li>
        </ul>
      </SectionContainer>
    </section>
  );
};

export default AboutProject;
