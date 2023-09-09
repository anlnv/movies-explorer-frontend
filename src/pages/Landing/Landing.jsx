import './Landing.css';
import Header from '../../components/Widgets/Header/Header';
import Footer from '../../components/Widgets/Footer/Footer';
import Promo from '../../components/Main/Promo/Promo';
import AboutProject from '../../components/Main/AboutProject/AboutProject';
import Techs from '../../components/Main/Techs/Techs';
import AboutMe from '../../components/Main/AboutMe/AboutMe';
import Portfolio from '../../components/Main/Portfolio/Portfolio';

const Landing = () => {
  return (
    <>
      <Header />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
};

export default Landing;
