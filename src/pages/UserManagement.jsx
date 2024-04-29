import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/user/getusers", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": sessionStorage.getItem("token"),
          role: sessionStorage.getItem("role"),
        },
      });
      console.log(res);
      if (res.status === 201) {
        await setUsers([...res.data.allUsers]);
        console.log(users);
      }
    } catch (error) {
      toast.error(error.data.response.message);
    }
  };

  const handleEdit = (id) => {
    setUserId(id);
  };

  const handleUpdate = async () => {
    console.log(users);
    try {
      const user = await users.filter((user) => userId === user._id);

      const res = await axios.put(`/user/update/${userId}`, user, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": sessionStorage.getItem("token"),
          role: sessionStorage.getItem("role"),
        },
      });
      if (res.status === 201) {
        toast.success(res.data.message);

        setUserId(null);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/user/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": sessionStorage.getItem("token"),
          role: sessionStorage.getItem("role"),
        },
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        setUsers(users.filter((user, id) => user._id !== id));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="container ">
      <h1 style={{ color: "whitesmoke", mixBlendMode: "difference" }}>
        USER MANAGEMENT
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">User Roles</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, id) => {
            return (
              <tr key={id}>
                <th scope="row">{user._id}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {userId === user._id ? (
                    <select
                      className="form-select"
                      id="cuisine"
                      aria-label="Default select example"
                      onChange={(e) => {
                        users[id].role = e.target.value;
                        setUsers([...users]);
                      }}
                    >
                      <option value="Admin">Admin</option>

                      <option value="user">user</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {userId === user._id ? (
                    <span
                      className="btn btn-primary m-1"
                      onClick={handleUpdate}
                    >
                      Update
                    </span>
                  ) : (
                    <span
                      className="btn btn-primary m-1"
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </span>
                  )}

                  <span
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
