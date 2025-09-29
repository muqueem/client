import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
// import Plans from "./pages/Plans";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./components/Admin";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import MyAccount from "./pages/MyAccount";
import EditProfile from "./components/EditProfile";
import MySubscription from "./components/MySubscription";
import ProductsList from "./pages/ProductsList";
import ProductPage from "./pages/ProductPage";
import Context from "../context/Context";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Context />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/plans" element={<Plans />} /> */}
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route path="/checkout/:planId" element={<Checkout />} />
            <Route path="/my-account" element={<MyAccount />}>
              <Route index element={<EditProfile />} />
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="dashboard" element={<Admin />} />
              <Route path="my-subscription" element={<MySubscription />} />
            </Route>

            <Route path="/admin" element={<Navigate to={"/my-account/dashboard"} />} />

          </Route>

          <Route path="/success/:token" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
