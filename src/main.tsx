import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SocketProvider from "./hooks/SocketProvider.tsx";
import SWRProvider from "./providers/swr/index.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toaster />
    <SWRProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </SWRProvider>
  </BrowserRouter>
);
