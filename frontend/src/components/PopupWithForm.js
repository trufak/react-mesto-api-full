import { useRef, useEffect, useState } from 'react';

function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  name,
  title,
  buttonClassName,
  textButton,
  isValid,
  children
}) {

  //Обработчик закрытия popup при нажатии на крестик или оверлей
  const handleClose = (e) => {
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("close-button")
    )
    onClose();
  };

  return (
    <div
      className={`popup ${name} ${isOpen && "popup_opened"}`}
      onClick={handleClose}
    >
      <div className="popup__container">
        <button
          type="button"
          className="close-button close-button_popup"
          aria-label="Закрыть"
        />
        <h3 className="popup__title">{title}</h3>
        <form
          name={name}
          className="popup__form"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className={
              `popup__submit-button
              ${buttonClassName}
              ${!isValid && 'popup__submit-button_disable'}`}
            disabled={!isValid}
          >
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
