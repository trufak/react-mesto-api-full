import { useState, } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function Login({ onLogin }) {
  const [textButton, setTextButton] = useState("Войти");
  const {values, handleChange, errors} = useFormAndValidation()

  const handleSubmit = (e) => {
    e.preventDefault();
    setTextButton("Вход...");
    onLogin(values.email, values.password)
    .finally(()=>setTextButton("Войти"));
  };

  return (
    <div className="sign">
      <h1 className="sign__title">Вход</h1>
      <form
        className="form form_sign"
        name="login"
        onSubmit={handleSubmit}
        noValidate >
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
    </div>
  );
}

export default Login;
