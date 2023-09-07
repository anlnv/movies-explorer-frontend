import './Profile.css';
import Header from '../../components/Widgets/Header/Header';
import ProfileForm from '../../components/Forms/ProfileForm/ProfileForm';

const Profile = ({ handleResponse }) => {
  return (
    <>
      <Header />
      <ProfileForm handleResponse={handleResponse} />
    </>
  );
};

export default Profile;
