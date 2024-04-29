import { Link } from "react-router-dom";
import { UseRecipe } from "../contexts/recipeContexts";
import { useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

function MyRecipe() {
  const id = sessionStorage.getItem("id");
  const { recipeData, myRecipe } = UseRecipe();

  useEffect(() => {
    myRecipe(id);
  }, []);

  return (
    <div className="container justify-items-center align-content-center ">
      {" "}
      {recipeData.length === 0 ? null : (
        <div className="row-col-12 text-center mb-5">
          {" "}
          <Link to={"/addrecipe"} className="btn btn-success">
            {" "}
            Add Recipe
          </Link>
        </div>
      )}
      <div className="row align-items-center gap-3 text-center">
        {recipeData.length > 0 ? (
          recipeData.map((recipe, idx) => (
            <RecipeCard recipe={recipe} key={idx} />
          ))
        ) : (
          <div
            className="container align-content-center"
            style={{ height: "60vh" }}
          >
            {" "}
            <Link to={"/addrecipe"} className="btn btn-success  ">
              {" "}
              Add Recipe
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRecipe;
