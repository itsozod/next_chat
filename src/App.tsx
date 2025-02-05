import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { accesses } from "./utils/constants/accesses";
import { tokenParser } from "./utils/helpers/tokenParser";

function App() {
  const { id } = tokenParser();

  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute onlyFor />}>
          <Route index element={<Home />} />
        </Route>
        <Route
          path="/chat"
          element={<ProtectedRoute onlyFor={accesses?.[Number(id)]?.read} />}
        >
          <Route index element={<Chat />} />
        </Route>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
