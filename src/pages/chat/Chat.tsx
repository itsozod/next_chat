import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Chat room</div>
      <button onClick={() => navigate("/")}>To Home page</button>
    </>
  );
};

export default Chat;
