import { i18nReady } from "./i18n/config";
import { I18nProvider } from "./i18n/I18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./index.css";
import router from "./routes";

const queryClient = new QueryClient();
const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

await i18nReady;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <React.Suspense
          fallback={
            <div
              role="status"
              aria-label="Loading"
              className="min-h-screen grid place-items-center"
            >
              ◌
            </div>
          }
        >
          <AuthProvider>
            <FavoritesProvider>
              <CartProvider>
                <RouterProvider router={router} />
              </CartProvider>
            </FavoritesProvider>
          </AuthProvider>
        </React.Suspense>
      </I18nProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
