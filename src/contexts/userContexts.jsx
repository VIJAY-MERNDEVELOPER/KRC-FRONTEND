/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const UseUser = () => {
  return useContext(UserContext);
};

export { UserContext, UseUser, UserContextProvider };
