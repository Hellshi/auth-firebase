import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjusExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjusExpirationTime - currentTime;
    return remainingDuration;
  };

  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const logginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);

    const remainingTime = calculateRemainingTime(expirationTime);

    setTimeout(logOutHandler, remainingTime);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: logginHandler,
    logout: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
