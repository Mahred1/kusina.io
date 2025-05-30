import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

const authProvider = createContext();

function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminNav, setAdminNav] = useState(false);
  const [error, setError] = useState("");
  //   get user
  useEffect(
    function () {
      async function getUser() {
        const token = localStorage.getItem("user");
        const res = await fetch("http://127.0.0.1:8000/recipebook/favorites/", {
          method: "GET",
          headers: {
            Authorization: `JWT ${token}`,
          },
        });

        if (!res.ok) {
          setUser(null);
          setAuthLoading(false);

          return;
        }
        if (token) {
          const user = jwtDecode(token);
          console.log(user);
          setUser(user);
          if (user.role === "admin") {
            setAdminNav(true);
          } else {
            setAdminNav(false);
          }
        }
        setAuthLoading(false);
      }
      getUser();
    },
    []
  );

  console.log(adminNav);

  //   logout

  function logout() {
    localStorage.removeItem("user");
  }

  //login

  async function login(username, password) {
    setAuthLoading(true);
    const res = await fetch("http://127.0.0.1:8000/auth/jwt/create/", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      if (data.detail) {
        setError(data.detail);
      }
      console.log(error);
      // setError(await res.json());
      setAuthLoading(false);
      return false;
    }
    const data = await res.json();
    setUser(data.access);
    localStorage.setItem("user", data.access);
    setAuthLoading(false);
    if (jwtDecode(data.access).role === "admin") {
      setAdminNav(true);
    } else {
      setAdminNav(false);
    }
    return true;
  }
  //sign up
  async function signup(username, password, email, full_name, role) {
    setAuthLoading(true);
    const res = await fetch("http://127.0.0.1:8000/auth/users/", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        email,
        full_name,
        role,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(email);
    if (!res.ok) {
      const data = await res.json();
      if (data.username) {
        setError(data.username[0]);
      }
      // console.log(await res.json());
      setAuthLoading(false);
      return false;
    }

    setAuthLoading(false);
    return true;
  }

  return (
    <authProvider.Provider
      value={{
        user,
        authLoading,
        logout,
        login,
        signup,
        adminNav,
        error,
        setError,
      }}
    >
      {children}
    </authProvider.Provider>
  );
}
function useAuth() {
  const context = useContext(authProvider);
  return context;
}

export { AuthContext, useAuth };
