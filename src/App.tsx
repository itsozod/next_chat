import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home/Home";
import Contacts from "@/pages/contacts/Contacts";
import Profile from "@/pages/profile/Profile";
import ProtectedRoutes from "@/components/protectedLayout/ProtectedLayout";
import SignIn from "@/pages/signIn/SignIn";
import SignUp from "@/pages/signUp/SignUp";

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
        <Route path="/signin" index element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
