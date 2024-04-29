import { Link } from "react-router-dom";
import "./RecipeCard.css";

/* eslint-disable react/prop-types */
function RecipeCard({ recipe }) {
  // console.log(recipe.createdOn.tolocaleString("en-IN"));
  console.log(recipe.user.userid);
  const utcDate = new Date(recipe.createdOn.toLocaleString("en-IN"));

  const createdOn = utcDate.toLocaleString("en-IN"); // Convert to local time

  console.log(createdOn);

  return (
    <div className="card text-center ">
      <div className="row g-0">
        <div className="col-md-2 my-1">
          <img
            src="/Food_image.avif"
            className=" img-thumbnail rounded-1 p-2 "
            alt="..."
          />
        </div>
        <div className="col-md-8 mt-1 ">
          <div className="card-body">
            <div className="col-md-12 ml-5">
              <h5 className="card-title">{recipe.recipename}</h5>
              <p className="card-text  text-start overflow-hidden">
                {recipe.description}
              </p>{" "}
            </div>
          </div>
          <div className="row-col-8 mt-3">
            <Link
              to={`/recipe/${recipe._id}`}
              state={recipe.user.userid}
              className="btn btn-success text-center"
            >
              {" "}
              Read More{" "}
            </Link>
          </div>
        </div>{" "}
        <div className="card-footer text-body-secondary ">{createdOn}</div>
      </div>
    </div>
  );
}

export default RecipeCard;
