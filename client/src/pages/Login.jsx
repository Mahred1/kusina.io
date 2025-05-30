import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import Error from "../components/Error";

function Login() {
  const location = useLocation();

  useEffect(() => {
    setError("");
  }, [location]);
  
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { login, authLoading, error, setError } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (username === "") {
      setError("Username is required");
      return;
    }
    if (password === "") {
      setError("password is required");
      return;
    }
    const log = await login(username, password);
    console.log(log);
    if (log && !authLoading) navigate("/home");
  }
  return (
    <main className="flex flex-col justify-center items-center bg-[url(background.jpg)]   bg-cover bg-center min-w-screen min-h-screen">
      <div className=" bg-[rgba(0,0,0,0.4)] fixed top-0 left-0  min-w-screen min-h-screen"></div>
      {error && <Error>{error}</Error>}
      <div className="relative z-1 bg-white flex flex-col px-[50px] py-[80px] rounded-[21px] ">
        <img width={310} height={198} src="logo-2.svg"></img>
        <form className="flex flex-col justify-center items-center">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            className="w-[101%] bg-[#F1F1F1] p-[15px] text-[17px] rounded-[15px] outline-0 border-1 border-[#b4b4b4ee] mt-5"
            placeholder="username"
            type="text"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-[100%] bg-[#F1F1F1] p-[15px] text-[17px] rounded-[15px] outline-0 border-1 border-[#b4b4b4ee] mt-5"
            placeholder="password"
            type="password"
          />
          <button
            onClick={(e) => handleLogin(e)}
            className="w-[80%] border-1  text-center transition ease-in font-light text-xl  text-white bg-primary mt-8 px-7 py-3 rounded-[10px] hover:bg-white cursor-pointer hover:text-primary hover:border-primary drop-shadow-md"
          >
            {authLoading ? <p>loading...</p> : "Login"}
          </button>
          <Link
            className="text-center font-lex text-[#464646] hover:underline mt-3.5"
            to={"/signup"}
          >
            don't have an account?
          </Link>
        </form>
      </div>
    </main>
  );
}

export default Login;
