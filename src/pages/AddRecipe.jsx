import RecipeForm from "../components/RecipeForm";

function AddRecipe() {
  return (
    <div className="  container">
      <div className="row">
        <h1 className="col-8 text-center ">ADD RECIPE</h1>
        {/* Recipe form to add Recipe */}
        <RecipeForm></RecipeForm>
      </div>
    </div>
  );
}

export default AddRecipe;
