const AuthFormButtons = ({ isValid, render, page }) => {
  return (
    <div className={'auth__btn-wrapper'}>
      <button
        type={'submit'}
        className={`auth__submit btn-hover ${!isValid && 'auth__submit_disabled'}`}
        disabled={!isValid}
      >
        {render.submitButton[page]}
      </button>
      <p className={'auth__question'}>{render.question[page]}{render.link[page]}</p>
    </div>
  );
};

export default AuthFormButtons;
