import './Signup.css';
import AuthForm from '../../components/Forms/AuthForm/AuthForm';

const Signup = ({ page, handleResponse }) => {
  return (
    <main>
      <AuthForm page={page} handleResponse={handleResponse} />
    </main>
  );
};

export default Signup;
