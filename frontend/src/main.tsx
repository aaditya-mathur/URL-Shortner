import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#111',
            color: '#fff',
            border: '1px solid #2a2a2a',
          },
          success: {
            iconTheme: {
              primary: '#fff',
              secondary: '#111',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#111',
            },
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);