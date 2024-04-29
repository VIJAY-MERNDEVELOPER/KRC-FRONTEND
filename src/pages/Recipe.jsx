import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const userId = sessionStorage.getItem("id");
  const userRole = sessionStorage.getItem("role");

  console.log(userId);
  const recipeFetch = async () => {
    try {
      const res = await axios.get(`/recipe/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": sessionStorage.getItem("token"),
          id: id,
        },
      });
      console.log(res);
      if (res.status === 200) {
        setRecipe(res.data.recipe[0]);
        setIngredients([...res.data.recipe[0].ingredients]);
        setSteps([...res.data.recipe[0].steps]);
        console.log(res);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  // console.log(recipe.user.userid);
  const deleteRecipe = async () => {
    try {
      const res = await axios.delete(`/recipe/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": sessionStorage.getItem("token"),
          id: id,
        },
      });
      console.log(id);
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/myrecipe");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    recipeFetch();
  }, []);

  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-10 ">
          <h2 className="text-center">{recipe.recipename}</h2>
          <div className="row">
            <span className="col-3">
              <span className="fw-bold">cuisine :</span> {recipe.cuisine}
            </span>
            <span className="col-2">
              {" "}
              <span className="fw-bold">course : </span>
              {recipe.course}
            </span>
          </div>
          <div className="row justify-content-around mt-3">
            <img
              src="/Food_image.avif"
              alt=""
              style={{ maxWidth: "30vw", maxHeight: "30vh" }}
              className="p-2 "
            />
          </div>
          <div className="row mt-2">
            <span className="col-3">
              {" "}
              <span className="fw-bold">Servings : </span> {recipe.servings}
            </span>
            <span className="col-2">
              {" "}
              <span className="fw-bold">Prep Time : </span>
              {recipe.prep_time}
            </span>
            <span className="col-2">
              {" "}
              <span className="fw-bold">Cook Time : </span>
              {recipe.cook_time}
            </span>
          </div>
          <div className="row mt-3  ">
            <h4 className="text-start">Ingredients</h4>
            <ul>
              {ingredients.map((ingredient, idx) => {
                return ingredient !== "" ? (
                  <li key={idx} className="text-start">
                    {ingredient}
                  </li>
                ) : null;
              })}
            </ul>
          </div>{" "}
          <div className="row mt-3 ">
            <h4 className="text-start">Steps</h4>
            <ul className="text-center">
              {steps.map((step, idx) => {
                return step !== "" ? (
                  <li key={idx} className="text-start">
                    {step}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
          {userId === state || userRole === "Admin" ? (
            <div>
              <Link
                to={`/editrecipe/${id}`}
                state={{ ...recipe }}
                className="btn btn-primary mx-2 "
              >
                Edit
              </Link>

              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteRecipe();
                }}
              >
                {" "}
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Recipe;
