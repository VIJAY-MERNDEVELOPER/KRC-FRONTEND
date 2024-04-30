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
    <div className="container ">
      <h1 className="  text-start mx-5">EDIT RECIPE</h1>
      <div className="">
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
