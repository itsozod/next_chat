import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProtectedRoutes from "./components/ProtectedRoute/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/chat" element={<ProtectedRoutes />}>
          <Route element={<Chat />} />
        </Route>
        <Route path="/signin" index element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
