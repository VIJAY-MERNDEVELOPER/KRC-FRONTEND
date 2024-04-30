/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const RecipeContext = createContext();

const RecipeContextProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState([]);
  const getRecipe = async () => {
    try {
      const res = await axios.get("/recipe/all");
      if (res.status === 201) {
        setRecipeData(res.data.recipe);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const myRecipe = async (id) => {
    try {
      const res = await axios.get(`/recipe/myrecipe/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": sessionStorage.getItem("token"),
        },
      });
      if (res.status === 200) {
        setRecipeData(res.data.recipe);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <RecipeContext.Provider
      value={{ recipeData, setRecipeData, getRecipe, myRecipe }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

const UseRecipe = () => {
  return useContext(RecipeContext);
};

export { RecipeContext, RecipeContextProvider, UseRecipe };
