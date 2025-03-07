import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider } from "./theme/ThemeProvider";
import { Toaster } from "react-hot-toast";
import SWRProvider from "./swr";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";

const Providers = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <HeroUIProvider>
        <Toaster />
        <SWRProvider>
          <RouterProvider router={router} />
        </SWRProvider>
      </HeroUIProvider>
    </ThemeProvider>
  );
};

export default Providers;
