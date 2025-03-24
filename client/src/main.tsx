import { BrowserRouter } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import AuthProvider from "./context/AuthProvider";

import "./styles/index.scss";

document.title = (import.meta.env.VITE_APP_NAME as string) || "React App";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <App />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
