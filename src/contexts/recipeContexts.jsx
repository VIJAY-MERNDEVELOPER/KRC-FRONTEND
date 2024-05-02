/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RecipeContext = createContext();

const RecipeContextProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  const navigate = useNavigate();

  // Function to Post a recipe
  const postRecipe = async (e, inputRecipe) => {
    e.preventDefault();
    console.log("input", inputRecipe);

    try {
      const {
        recipename,
        cuisine,
        course,
        prep_time,
        cook_time,
        servings,
        description,
        ingredients,
        steps,
        user,
      } = inputRecipe;

      if (
        recipename ||
        description ||
        ingredients.length > 0 ||
        steps.length > 0
      ) {
        const res = await axios.post("/recipe/setrecipe", inputRecipe);
        if (res.status === 201) {
          toast.success(res.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Recipe view in detail based on id
  const recipeFetch = async (id) => {
    try {
      const res = await axios.get(`/recipe/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": sessionStorage.getItem("token"),
          id: id,
        },
      });

      if (res.status === 200) {
        setRecipe(res.data.recipe[0]);
        console.log(recipe);
        setIngredients([...res.data.recipe[0].ingredients]);
        console.log(ingredients);
        setSteps([...res.data.recipe[0].steps]);

        // toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Function to get all the recipe
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

  // Funtion to get recipes of a user using get API
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

  // Function to delete Recipe
  const deleteRecipe = async (id) => {
    try {
      const res = await axios.delete(`/recipe/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": sessionStorage.getItem("token"),
          id: id,
        },
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/myrecipe");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // Function to update Recipe
  const updateRecipe = async (e, id, input) => {
    e.preventDefault();

    try {
      console.log(input);
      const res = await axios.put(`/recipe/edit/${id}`, input, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": sessionStorage.getItem("token"),
          id: id,
        },
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        navigate(`/recipe/${id}`);
      } else {
        toast.error("Not updated");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipeData,
        setRecipeData,
        getRecipe,
        myRecipe,
        postRecipe,
        deleteRecipe,
        updateRecipe,
        recipeFetch,
        recipe,
        ingredients,
        steps,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

const UseRecipe = () => {
  return useContext(RecipeContext);
};

export { RecipeContext, RecipeContextProvider, UseRecipe };
