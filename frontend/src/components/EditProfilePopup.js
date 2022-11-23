import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {
  //States
  const [textButton, setTextButton] = useState("Сохранить");
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, resetForm, setValues, setIsValid} = useFormAndValidation();

  useEffect(() => {
    setValues({
      ...values,
      name: currentUser.name,
      description: currentUser.about,
    });
    setIsValid(false);
    isOpen && setTextButton("Сохранить");
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTextButton("Сохранение...");
    onUpdateUser({
      name: values.name,
      about: values.description,
    });
  };

  return (
    <PopupWithForm
      name="popup_edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClassName="popup__submit-button_edit"
      textButton={textButton}
      isValid={isValid}
    >
      <ul className="popup__inputs">
        <li>
          <input
            className="popup__input popup__input_name-profile"
            id="name-profile"
            name="name"
            type="text"
            minLength="2"
            maxLength="40"
            placeholder="Имя профиля"
            required
            value={values.name || ""}
            onChange={handleChange}
          />
          <span className="popup__input-error name-profile-error">{errors.name}</span>
        </li>
        <li>
          <input
            className="popup__input popup__input_desc-profile"
            id="desc-profile"
            name="description"
            type="text"
            minLength="2"
            maxLength="200"
            placeholder="О себе"
            required
            value={values.description || ""}
            onChange={handleChange}
          />
          <span className="popup__input-error desc-profile-error">{errors.description}</span>
        </li>
      </ul>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
