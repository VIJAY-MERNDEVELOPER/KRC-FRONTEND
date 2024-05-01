import { useEffect, useState } from "react";

import EditRecipeForm from "../components/EditRecipeForm";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

function EditRecipe() {
  const { id } = useParams();

  let { state } = useLocation();

  const [input, setInput] = useState({ ...state });

  return (
    <div className="  container">
      <div className="row">
        <h1 className="col-8 text-center ">EDIT RECIPE</h1>
        <EditRecipeForm
          input={input}
          setInput={setInput}
          id={id}
        ></EditRecipeForm>
      </div>
    </div>
  );
}

export default EditRecipe;
