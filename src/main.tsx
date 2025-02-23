import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider } from "@/providers/theme/ThemeProvider.tsx";
import SWRProvider from "@/providers/swr/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark">
      <HeroUIProvider>
        <Toaster />
        <SWRProvider>
          <App />
        </SWRProvider>
      </HeroUIProvider>
    </ThemeProvider>
  </BrowserRouter>
);
