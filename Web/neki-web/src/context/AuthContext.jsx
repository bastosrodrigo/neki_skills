import React, { useEffect, useState, createContext } from "react";
import { Api } from "../api/axios";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("id");
      const storageToken = localStorage.getItem("token");

      if (storageUser && storageToken) {
        setUser(storageUser);
      }
    };
    loadingStoreData();
  }, []);

  const signIn = async (username, password) => {
    try {
      const loginRequestData = {
        username: username,
        password: password,
      };
      const response = await Api.post("/auth/signin", loginRequestData);
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setUser(response.data);
        Api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    return <Navigate to={"/registrar"} />;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signed: !!user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;