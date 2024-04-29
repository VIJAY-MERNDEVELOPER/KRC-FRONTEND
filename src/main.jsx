import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./contexts/userContexts.jsx";
import { RecipeContextProvider } from "./contexts/recipeContexts.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <RecipeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecipeContextProvider>
  </UserContextProvider>
);
