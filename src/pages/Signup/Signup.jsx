import './Signup.css';
import AuthForm from '../../components/Forms/AuthForm/AuthForm';

const Signup = ({ page }) => {
  return (
    <main>
      <AuthForm page={page} />
    </main>
  );
};

export default Signup;
