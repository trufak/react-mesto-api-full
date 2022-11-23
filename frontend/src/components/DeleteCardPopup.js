import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";

function DeleteCardPopup({ isOpen, onSubmit, onClose }) {
  const [textButton, setTextButton] = useState("Да");

  useEffect(() => {
    isOpen && setTextButton("Да");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTextButton("Удаление...");
    onSubmit();
  };

  return (
    <PopupWithForm
      name="popup_delete-card"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClassName="popup__submit-button_delete"
      textButton={textButton}
      isValid={true}
    />
  );
}

export default DeleteCardPopup;
