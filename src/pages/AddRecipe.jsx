import RecipeForm from "../components/RecipeForm";

function AddRecipe() {
  return (
    <div className="  container">
      <div className="row">
        <h1 className="col-8 text-center ">ADD RECIPE</h1>
        <RecipeForm></RecipeForm>
      </div>
    </div>
  );
}

export default AddRecipe;
