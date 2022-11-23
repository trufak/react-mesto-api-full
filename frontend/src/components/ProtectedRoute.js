import { Route, Redirect } from "react-router-dom";

function ProtectedRoute ({path, loggedIn, children}) {
  return (
    <Route path={path}>
      {loggedIn
       ? children
       : <Redirect to="/sign-in" />
      }
    </Route>
  )

}

export default ProtectedRoute;
