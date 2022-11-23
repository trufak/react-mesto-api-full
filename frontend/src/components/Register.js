import { useState } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { Link } from "react-router-dom";

function Register({onRegister}) {
  const [textButton, setTextButton] = useState("Зарегистрироваться");

  const {values, handleChange, errors} = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTextButton('Регистрация...');
    onRegister(values.email, values.password)
    .finally(()=>setTextButton('Зарегистрироваться'));
  };

  return (
    <div className="sign">
      <h1 className="sign__title">Регистрация</h1>
      <form
        className="form form_sign"
        name="register"
        noValidate
        onSubmit={handleSubmit}>
        <input
          className="form__input form__input_sign"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
        />
        <span className="form__error">{errors.email}</span>
        <input
          className="form__input form__input_sign"
          type="password"
          name="password"
          placeholder="Пароль"
          value={values.password || ""}
          onChange={handleChange}
        />
        <span className="form__error">{errors.password}</span>
        <button className="form__submit form__submit_sign" type="submit">{textButton}</button>
      </form>
      <Link className="sign__login-link" to="/sign-in">Уже зарегистрированы? Войти </Link>
    </div>
  );
}

export default Register;
