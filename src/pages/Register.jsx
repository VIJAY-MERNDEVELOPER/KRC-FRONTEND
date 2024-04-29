import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/user/register", {
        ...user,
      });
      const { username, email, password } = user;
      if (!username || !email || !password) {
        toast.error(res.data.message);
        return;
      }
      if (res.status === 201) {
        const data = res.data;
        // sessionStorage.setItem("id", data.id);
        // sessionStorage.setItem("username", data.username);
        // sessionStorage.setItem("role", data.role);
        // sessionStorage.setItem("token", data.token);

        toast.success(data.message);
        navigate("/login");
      }
      if (res.status === 409) toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="container col-7 justify-items-center align-content-center">
      {" "}
      <h1 className="text-center">Register</h1>
      <form
        onSubmit={(e) => {
          handleRegister(e);
        }}
      >
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            UserName
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            aria-describedby="emailHelp"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <div id="passwordHelpBlock" className="form-text">
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters.
          </div>
        </div>
        <div className="text-center ">
          <button type="submit " className="btn btn-primary ">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
