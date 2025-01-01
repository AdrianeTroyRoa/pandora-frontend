//Routing
import { Route } from "@solidjs/router";

//pages
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

function AuthRoutes() {
  console.log("route function imported successfully");
  return (
    <>
      <Route path="/login" component={Login} />
      <Route path="/sign-up" component={Register} />
    </>
  );
}

export default AuthRoutes;
