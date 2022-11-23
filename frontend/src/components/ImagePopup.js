function ImagePopup({ isOpen, onClose, card }) {

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
      className={`popup popup_card ${isOpen && "popup_opened"}`}
      onClick={handleClose}
    >
      <div className="popup__card-container">
        <button
          type="button"
          className="close-button close-button_popup"
          aria-label="Закрыть"
        />
        <img
          className="popup__mask"
          src={card.link}
          alt={card.name}
        />
        <h2 className="popup__caption">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
