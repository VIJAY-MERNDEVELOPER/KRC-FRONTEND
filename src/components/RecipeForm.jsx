/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { UseRecipe } from "../contexts/recipeContexts";
import { useNavigate } from "react-router-dom";

function RecipeForm() {
  // cuisine and courses list in select list
  const cuisines = ["None", "American", "Chinese", "German", "Indian"];
  const courses = ["None", "Appetizer", "Side Dish", "Snack"];
  const navigate = useNavigate();

  const username = sessionStorage.getItem("username");
  const userid = sessionStorage.getItem("id");
  const defaultValue = {
    recipename: "",
    cuisine: "None",
    course: "None",
    prep_time: "",
    cook_time: "",
    servings: "",
    description: "",
    ingredients: [""],
    steps: [""],
    user: { userid, username },
  };
  // State management for Inouts
  const [inputRecipe, setInputRecipe] = useState(defaultValue);

  const { postRecipe } = UseRecipe();
  return (
    <div
      className="container justify-content-center "
      style={{ width: "100%" }}
    >
      <form
        onSubmit={(e) => {
          postRecipe(e, inputRecipe);
          navigate("/myrecipe");
        }}
      >
        <div className="col-sm-8 mb-3 ">
          <label htmlFor="recipename" className="form-label ">
            Recipe Name
          </label>

          <input
            type="text"
            className="form-control"
            id="recipename"
            placeholder="Example input placeholder"
            value={inputRecipe.recipename}
            onChange={async (e) => {
              setInputRecipe({ ...inputRecipe, recipename: e.target.value });
            }}
          />
        </div>

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
                setInputRecipe({ ...inputRecipe, cuisine: e.target.value });
              }}
            >
              {cuisines.map((cuisine, idx) => {
                return (
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
                setInputRecipe({ ...inputRecipe, course: e.target.value });
              }}
            >
              {courses.map((course, idx) => {
                return (
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
              value={inputRecipe.prep_time}
              onChange={async (e) => {
                setInputRecipe({ ...inputRecipe, prep_time: e.target.value });
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
              value={inputRecipe.cook_time}
              onChange={async (e) => {
                setInputRecipe({ ...inputRecipe, cook_time: e.target.value });
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
              value={inputRecipe.servings}
              onChange={async (e) => {
                setInputRecipe({ ...inputRecipe, servings: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-sm-8">
            <label htmlFor="shortDescription" className="form-label">
              Short Description
            </label>
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="shortDescription"
              rows="3"
              value={inputRecipe.description}
              onChange={async (e) => {
                setInputRecipe({
                  ...inputRecipe,
                  description: e.target.value,
                });
              }}
            ></textarea>
          </div>
        </div>

        <div className="mb-3 col-sm-8">
          <label htmlFor="ingredients" className="form-label">
            Ingredients
          </label>
          <div className="col-sm-11">
            {inputRecipe.ingredients.map((ingredient, idx) => {
              return (
                <div className="row my-2 mx-1" key={idx}>
                  <input
                    type="text"
                    className="form-control  "
                    id="ingredients"
                    placeholder="Enter Ingredients"
                    value={ingredient}
                    onChange={async (e) => {
                      inputRecipe.ingredients[idx] = e.target.value;
                      setInputRecipe({
                        ...inputRecipe,
                        ingredients: [...inputRecipe.ingredients],
                      });
                    }}
                  ></input>{" "}
                  <span
                    className="col-3 my-2"
                    style={{
                      position: "absolute",
                      left: "48%",
                    }}
                    onClick={(e) => {
                      const newIngredients = inputRecipe.ingredients.filter(
                        (ingredient, id) => id !== idx
                      );
                      setInputRecipe({
                        ...inputRecipe,
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

            <div className="col-sm-12 text-end mt-1">
              <span
                className="text-end"
                onClick={() => {
                  setInputRecipe({
                    ...inputRecipe,
                    ingredients: [...inputRecipe.ingredients, ""],
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
            {inputRecipe.steps.map((step, idx) => {
              return (
                <div className="row my-2 mx-1" key={idx}>
                  <textarea
                    className="form-control my-2"
                    placeholder="Leave a comment here"
                    id="step"
                    style={{ height: "80px" }}
                    value={step}
                    onChange={async (e) => {
                      inputRecipe.steps[idx] = e.target.value;
                      setInputRecipe({
                        ...inputRecipe,
                        steps: [...inputRecipe.steps],
                      });
                    }}
                  ></textarea>{" "}
                  <span
                    className="col-3 my-5"
                    style={{
                      position: "absolute",
                      left: "48%",
                    }}
                    onClick={(e) => {
                      const newSteps = inputRecipe.steps.filter(
                        (step, id) => id !== idx
                      );
                      setInputRecipe({
                        ...inputRecipe,
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
                  setInputRecipe({
                    ...inputRecipe,
                    steps: [...inputRecipe.steps, ""],
                  });
                }}
                type="button"
              >
                ➕
              </span>
            </div>
          </div>
        </div>
        <div className="mb-3 col-sm-8 ">
          <button type="submit" className="btn btn-success my-5">
            Add Recipe
          </button>
        </div>
      </form>{" "}
    </div>
  );
}

export default RecipeForm;
