import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Plans from "./pages/Plans";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/checkout/:planId" element={<Checkout />} />
          <Route path="/my-account" element={<MyAccount />}>
            <Route index element={<EditProfile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="dashboard" element={<Admin />} />
            <Route path="my-subscription" element={<MySubscription />} />
          </Route>

          <Route path="/admin" element={<Navigate to={"/my-account/dashboard"} />} />

        </Route>

        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
