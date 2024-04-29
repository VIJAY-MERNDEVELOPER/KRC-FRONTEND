import { Link } from "react-router-dom";

function Home() {
  const username = sessionStorage.getItem("username");

  return (
    <div
      className="container justify-items-center align-content-center "
      style={{ height: "70vh" }}
    >
      {username ? (
        <div>
          <h1 style={{ color: "whitesmoke", mixBlendMode: "difference" }}>
            WELCOME TO KITCHEN RECIPE MANAGEMENT
          </h1>
        </div>
      ) : (
        <div className="row gap-5 justify-content-center align-items-center">
          {" "}
          <Link to={"/login"} className="btn btn-primary col-3 ">
            {" "}
            Login{" "}
          </Link>
          <Link to={"/"} className="btn btn-primary col-3">
            {" "}
            Login as Guest{" "}
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
