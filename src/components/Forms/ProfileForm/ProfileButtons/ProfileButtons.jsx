const ProfileButtons = ({ isValid, onSignout }) => {
  return (
    <div className={'profile__btn-wrapper'}>
      <button
        className={`profile__btn ${!isValid ? 'profile__btn_disabled' : 'btn-hover'}`}
        type={'submit'}
        disabled={!isValid}
      >
        Редактировать
      </button>
      <button
        className={'profile__btn profile__btn_type_signout btn-hover'}
        type={'button'}
        onClick={onSignout}
      >
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default ProfileButtons;
