import { lazy } from "solid-js";
import { Router, Route } from "@solidjs/router";

//routes
//import AuthRoutes from "./AuthRoutes.jsx";

//pages
const Splash = lazy(() => import("../pages/Splash"));
const InquireNow = lazy(() => import("../pages/Inquiry"));
const Products = lazy(() => import("../pages/Products"));
const IndividualProduct = lazy(() => import("../pages/IndividualProduct"));

function Routes() {
  console.log("route function imported successfully");
  return (
    <Router>
      <Route path="/" component={Splash} />
      <Route path="/home" component={Splash} />
      <Route path="/contact-us" component={InquireNow} />
      <Route path="/products" component={Products} />
      <Route path="/product/:id" component={IndividualProduct} />
      {/*<AuthRoutes />*/}
    </Router>
  );
}

export default Routes;
