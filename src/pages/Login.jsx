import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UseUser } from "../contexts/userContexts";

function Login() {
  const { user, setUser } = UseUser();

  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const { email, password } = user;

      if (!email || !password) {
        toast.error("Enter User Credentials");
        return;
      }

      const res = await axios.post("/user/login", { email, password });
      if (res.status === 200) {
        console.log(res);
        const data = res.data;
        sessionStorage.setItem("id", data.id);
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("token", data.token);
        toast.success(data.message);
        navigate("/");
      } else {
        console.log(res);

        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container col-7 justify-items-center align-content-center">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
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
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />

          <div id="passwordHelpBlock" className="form-text">
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters.
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <Link to={"/user/register"} className="btn btn-primary ">
            {" "}
            Register
          </Link>

          <button type="submit " className="btn btn-success ">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
