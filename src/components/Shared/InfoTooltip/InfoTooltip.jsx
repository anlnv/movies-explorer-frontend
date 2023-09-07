import './InfoTooltip.css';

export const InfoToolip = ({ popupStatus, onClose }) => {
  const { isOpen, title, message } = popupStatus;

  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}/>
        <h2 className="popup__title">{title}</h2>
        <p className="popup__message">{message}</p>
      </div>
    </div>
  );
};
