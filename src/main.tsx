import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider } from "@/providers/theme/ThemeProvider.tsx";
import SWRProvider from "@/providers/swr/index.tsx";
import router from "@/routes/routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark">
    <HeroUIProvider>
      <Toaster />
      <SWRProvider>
        <RouterProvider router={router} />
      </SWRProvider>
    </HeroUIProvider>
  </ThemeProvider>
);
