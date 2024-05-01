import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.json";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyRecipe from "./pages/MyRecipe";
import AllRecipe from "./pages/AllRecipe";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Recipe from "./pages/Recipe";
import UserManagement from "./pages/UserManagement";

// Define BaseUrl of Rest Api
axios.defaults.baseURL = "http://localhost:3001/api";
//  "https://krc-backend.onrender.com/api";

function App() {
  return (
    <>
      {/* Toaster defined at top to access toast by all components */}
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

      <Navbar>
        <div
          className="container w-100 mt-5 justify-content-center align-items-center"
          style={{ width: "100vw", height: "70vh" }}
        >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/usermanagement" element={<UserManagement />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/myrecipe" element={<MyRecipe />} />
            <Route path="/addrecipe" element={<AddRecipe />} />
            <Route path="/all" element={<AllRecipe />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/editrecipe/:id" element={<EditRecipe />} />
          </Routes>
        </div>
      </Navbar>
    </>
  );
}

export default App;
