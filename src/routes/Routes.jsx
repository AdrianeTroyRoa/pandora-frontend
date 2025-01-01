import { Router, Route } from "@solidjs/router";

//routes
import AuthRoutes from "./AuthRoutes.jsx";

//pages
import Splash from "../pages/Splash.jsx";
import InquireNow from "../pages/Inquiry";
import Products from "../pages/Products";

function Routes() {
  console.log("route function imported successfully");
  return (
    <Router>
      <Route path="/" component={Splash} />
      <Route path="/inquire" component={InquireNow} />
      <Route path="/products" component={Products} />
      <AuthRoutes />
    </Router>
  );
}

export default Routes;
