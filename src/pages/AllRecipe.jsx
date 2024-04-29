import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UseRecipe } from "../contexts/recipeContexts";

function AllRecipe() {
  const { recipeData, getRecipe } = UseRecipe();

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div className="container justify-items-center align-content-center">
      <div className="row justify-content-center ">
        <div className="row gap-3">
          {recipeData.map((recipe, idx) => {
            return <RecipeCard key={idx} recipe={recipe} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default AllRecipe;
