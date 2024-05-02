/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UseRecipe } from "../contexts/recipeContexts";

function EditRecipeForm({ input, setInput, id }) {
  const navigate = useNavigate();
  const cuisines = ["None", "American", "Chinese", "German", "Indian"];
  const courses = ["None", "Appetizer", "Side Dish", "Snack"];

  const { updateRecipe } = UseRecipe();

  return (
    <div className="container  " style={{ width: "100%" }}>
      <div className="row justify-content-center">
        <form onSubmit={(e) => updateRecipe(e, id, input)}>
          <div className="col-sm-8 mb-3">
            <label htmlFor="recipename" className="form-label">
              Recipe Name
            </label>

            <input
              type="text"
              className="form-control"
              id="recipename"
              placeholder="Example input placeholder"
              value={input.recipename}
              onChange={async (e) => {
                setInput({ ...input, recipename: e.target.value });
              }}
            />
          </div>{" "}
          <div className="row">
            <div className="col-4">
              <label htmlFor="cuisine" className="form-label">
                Cuisine
              </label>
              <select
                className="form-select"
                id="cuisine"
                aria-label="Default select example"
                onChange={(e) => {
                  setInput({ ...input, cuisine: e.target.value });
                }}
              >
                {cuisines.map((cuisine, idx) => {
                  return input.cuisine === cuisine ? (
                    <option key={idx} value={input.cuisine} selected>
                      {input.cuisine}
                    </option>
                  ) : (
                    <option key={idx} value={cuisine}>
                      {cuisine}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className=" col-4">
              <label htmlFor="course" className="form-label">
                Course
              </label>
              <select
                className="form-select"
                id="course"
                aria-label="Default select example"
                onChange={(e) => {
                  setInput({ ...input, course: e.target.value });
                }}
              >
                {courses.map((course, idx) => {
                  return input.course === course ? (
                    <option key={idx} value={course} selected>
                      {course}
                    </option>
                  ) : (
                    <option key={idx} value={course}>
                      {course}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3">
              <label htmlFor="prepTime" className="form-label">
                Prep_Time
              </label>

              <input
                type="text"
                className="form-control"
                id="prepTime"
                value={input.prep_time}
                onChange={async (e) => {
                  setInput({ ...input, prep_time: e.target.value });
                }}
              />
            </div>
            <div className="col-3">
              {" "}
              <label htmlFor="cookTime" className="form-label">
                Cook_Time
              </label>
              <input
                type="text"
                className="form-control"
                id="cookTime"
                value={input.cook_time}
                onChange={async (e) => {
                  setInput({ ...input, cook_time: e.target.value });
                }}
              />
            </div>
            <div className="col-2">
              {" "}
              <label htmlFor="servings" className="form-label">
                servings
              </label>
              <input
                type="text"
                className="form-control"
                id="servings"
                value={input.servings}
                onChange={async (e) => {
                  setInput({ ...input, servings: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-sm-8 ">
              <label htmlFor="shortDescription" className="form-label ">
                Short Description
              </label>

              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="shortDescription"
                style={{ height: "100px" }}
                value={input.description}
                onChange={async (e) => {
                  setInput({ ...input, description: e.target.value });
                }}
              ></textarea>
            </div>
          </div>
          <div className="mb-3 col-sm-8">
            <label htmlFor="ingredients" className="form-label">
              Ingredients
            </label>
            <div className="col-sm-11">
              {input.ingredients.map((ingredient, idx) => {
                return (
                  <div className="row my-2 mx-1" key={idx}>
                    <input
                      type="text"
                      className="form-control  "
                      aria-label=""
                      id="ingredients"
                      placeholder="Enter Ingredients"
                      value={ingredient}
                      onChange={async (e) => {
                        input.ingredients[idx] = e.target.value;
                        setInput({
                          ...input,
                          ingredients: [...input.ingredients],
                        });
                      }}
                    ></input>{" "}
                    <span
                      className="col-sm-3 my-2"
                      style={{ position: "absolute", left: "48%" }}
                      onClick={(e) => {
                        const newIngredients = input.ingredients.filter(
                          (ingredient, id) => id !== idx
                        );
                        setInput({
                          ...input,
                          ingredients: [...newIngredients],
                        });
                      }}
                      type="button"
                    >
                      ❌
                    </span>
                  </div>
                );
              })}

              <div className="col-sm-12 text-end mt-2">
                <span
                  className="text-end"
                  onClick={() => {
                    setInput({
                      ...input,
                      ingredients: [...input.ingredients, ""],
                    });
                  }}
                  type="button"
                >
                  ➕
                </span>
              </div>
            </div>
          </div>
          <div className="mb-3 col-sm-8">
            <label htmlFor="step" className="form-label">
              Steps
            </label>
            <div className="col-sm-11">
              {input.steps.map((step, idx) => {
                return (
                  <div className="row my-2 mx-1" key={idx}>
                    <textarea
                      className="form-control "
                      placeholder="Leave a comment here"
                      id="step"
                      style={{ height: "80px" }}
                      value={step}
                      onChange={async (e) => {
                        input.steps[idx] = e.target.value;
                        setInput({
                          ...input,
                          steps: [...input.steps],
                        });
                      }}
                    ></textarea>
                    <span
                      className="col-3 my-4"
                      style={{
                        position: "absolute",
                        left: "48%",
                      }}
                      onClick={(e) => {
                        const newSteps = input.steps.filter(
                          (step, id) => id !== idx
                        );
                        setInput({
                          ...input,
                          steps: [...newSteps],
                        });
                      }}
                      type="button"
                    >
                      ❌
                    </span>
                  </div>
                );
              })}

              <div className="col-sm-12 text-end mt-1">
                <span
                  className="text-end"
                  onClick={async () => {
                    setInput({
                      ...input,
                      steps: [...input.steps, ""],
                    });
                  }}
                  type="button"
                >
                  ➕
                </span>
              </div>
            </div>
          </div>
          <div className="mb-3 col-sm-8">
            <button type="submit" className="btn btn-success my-4">
              Update
            </button>
          </div>
        </form>{" "}
      </div>
    </div>
  );
}

export default EditRecipeForm;
