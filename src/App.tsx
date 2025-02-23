import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/protectedRoute/ProtectedRoutes";
import Home from "@/pages/home/Home";
import Contacts from "@/pages/contacts/Contacts";
import Profile from "@/pages/profile/Profile";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/contacts" element={<ProtectedRoutes />}>
          <Route path="/contacts" element={<Contacts />} />
        </Route>
        <Route path="/profile" element={<ProtectedRoutes />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/signin" index element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
