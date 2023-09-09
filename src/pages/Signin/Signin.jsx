import './Signin.css';
import AuthForm from '../../components/Forms/AuthForm/AuthForm';

const Signin = ({ page, handleResponse }) => {
  return (
    <main>
      <AuthForm page={page} handleResponse={handleResponse} />
    </main>
  );
};

export default Signin;
