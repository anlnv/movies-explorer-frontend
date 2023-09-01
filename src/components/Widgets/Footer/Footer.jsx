import './Footer.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import { ROUTER } from '../../../utils/config';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={'footer flex-center'}>
      <SectionContainer parent={'footer'} mods={['fd-column']}>
        <h4 className={'footer__heading'}>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h4>
        <div className={'footer__copyright-box'}>
          <p className={'footer__copyright'}>© 2020</p>
          <ul className={'footer__links'}>
            <li className={'footer__item'}>
              <Link className={'footer__link link-hover'} to={ROUTER.YANDEX} target={'_blank'}>
                Яндекс.Практикум
              </Link>
            </li>
            <li className={'footer__item'}>
              <Link className={'footer__link link-hover'} to={ROUTER.GIT} target={'_blank'}>
                Github
              </Link>
            </li>
          </ul>
        </div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;
