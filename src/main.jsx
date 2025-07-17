import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/Router.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient();
import AOS from "aos";
import "aos/dist/aos.css";

// AOSInitializer component
function AOSInitializer({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return children;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div>
          <AOSInitializer>
            <RouterProvider router={router} />
          </AOSInitializer>
          <ToastContainer></ToastContainer>
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
