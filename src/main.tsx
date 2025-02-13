import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SWRProvider from "./providers/swr/index.tsx";
import { Toaster } from "react-hot-toast";
import { HeroUIProvider } from "@heroui/system";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <HeroUIProvider>
      <Toaster />
      <SWRProvider>
        <main className="purple-dark text-foreground bg-background">
          <App />
        </main>
      </SWRProvider>
    </HeroUIProvider>
  </BrowserRouter>
);
