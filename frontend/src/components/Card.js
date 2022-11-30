import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card({ card, onCardLike, onCardClick, onCardDelete }) {
  //Hookes
  //Подписка на контекст с данными пользователя
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, является ли текущий пользователь владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "element__delete_visible" : "element__delete_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__item">
      <article className="element">
        <img
          className="element__mask"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <button
          type="button"
          className={cardDeleteButtonClassName}
          aria-label="Удалить место"
          onClick={handleDeleteClick}
        />
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          />
          <p className="element__like-count">{card.likes.length}</p>
        </div>
        <h2 className="element__caption">{card.name}</h2>
      </article>
    </li>
  );
}

export default Card;
