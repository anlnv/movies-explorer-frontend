import './Title.css';

const Title = ({ children }) => {
  return (
    <h2 className={'landing-title'}>
      {children}
    </h2>
  );
};

export default Title;
