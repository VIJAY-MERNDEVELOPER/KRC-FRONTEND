import { Link } from "react-router-dom";

function Home() {
  const username = sessionStorage.getItem("username");

  return (
    // Home component if logged in it will show content in Home page or it will ask to login or login as a guest
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
        // Login to view Recipes
        <div className="row gap-5 justify-content-center align-items-center">
          {" "}
          <Link to={"/login"} className="btn btn-primary col-3 ">
            {" "}
            Login{" "}
          </Link>
          <Link to={"/all"} className="btn btn-primary col-3">
            {" "}
            Login as Guest{" "}
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
