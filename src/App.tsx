import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProtectedRoutes from "./components/ProtectedRoute/ProtectedRoutes";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/chat" element={<ProtectedRoutes />}>
          <Route path="/chat" element={<Chat />} />
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
