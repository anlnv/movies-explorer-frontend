import './Signin.css';
import AuthForm from '../../components/Forms/AuthForm/AuthForm';

const Signin = ({ page }) => {
  return (
    <main>
      <AuthForm page={page} />
    </main>
  );
};

export default Signin;
