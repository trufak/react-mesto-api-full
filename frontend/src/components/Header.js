import logo from "../images/logo.svg";
import { Link, Route, Switch } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useState, useEffect } from "react";

function Header({ onLogOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [visibilityLoginData, setVisibilityLoginData] = useState(false);
  const [headerClassName, setHeaderClassName] = useState("header");
  const [loginClassName, setLoginClassName] = useState(
    "header__auth-container header__auth-container_hidden"
  );
  const [buttonClassName, setButtonClassName] = useState("header__menu-login");

  useEffect(() => {
    if (visibilityLoginData) {
      setLoginClassName("header__auth-container header__auth-container_logged");
      setButtonClassName("close-button close-button_header");
      setHeaderClassName("header header_vertical");
    } else {
      setLoginClassName(
        "header__auth-container header__auth-container_logged header__auth-container_hidden"
      );
      setButtonClassName("header__menu-login");
      setHeaderClassName("header header__mobile-logged");
    }
  }, [visibilityLoginData]);

  const changeVisibilityLoginData = () => {
    setVisibilityLoginData(!visibilityLoginData);
  };

  const handleLogOut = () => {
    setVisibilityLoginData(false);
    onLogOut();
  };

  return (
    <Switch>
      <Route path="/sign-in">
        <header className="header">
          <img className="logo logo_header" src={logo} alt="Логотип" />
          <div className="header__auth-container">
            <Link to="/sign-up" className="header__link-auth">
              Регистрация
            </Link>
          </div>
        </header>
      </Route>
      <Route path="/sign-up">
        <header className="header">
          <img className="logo logo_header" src={logo} alt="Логотип" />
          <div className="header__auth-container">
            <Link to="/sign-in" className="header__link-auth">
              Войти
            </Link>
          </div>
        </header>
      </Route>
      <Route path="/">
        <header className={headerClassName}>
          <img className="logo logo_header" src={logo} alt="Логотип" />
          <div className={loginClassName}>
            <span className="header__email"> {currentUser.email} </span>
            <Link
              to="/sign-in"
              className="header__link-auth header__link-auth_logged"
              onClick={handleLogOut}
            >
              Выйти
            </Link>
          </div>
          <button
            type="button"
            className={buttonClassName}
            onClick={changeVisibilityLoginData}
          />
        </header>
      </Route>
    </Switch>
  );
}

export default Header;
