import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Error from "../components/Error";

function Signup() {

    const location = useLocation();

  useEffect(() => {
    setError("");
  }, [location]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [full_name, setFullname] = useState("");
  const [role, setRole] = useState("user");


  const { signup, authLoading,error,setError } = useAuth();
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
if(full_name===""){
      setError("Name can not be empty")
      return
    }
     if(email===""){
      setError("Email can not be empty")
      return
    }
    if(username===""){
      setError("Username can not be empty")
      return
    }
    
   
    if(password===""){
      setError("Password can not be empty")
      return
    }else if(password.length<8){
      setError("Password must be greater than 8 ")
      return
    }
    
    const sign = await signup(username, password, email, full_name, role);
    if (sign) {
      navigate("/login");
    }
  }
  return (
    <main className="flex flex-col justify-center items-center bg-[url(background.jpg)]   bg-cover bg-center min-w-screen min-h-screen">
      <div className=" bg-[rgba(0,0,0,0.4)] fixed top-0 left-0  min-w-screen min-h-screen"></div>
      {error && <Error>{error}</Error>}


      <div className="relative z-1 bg-white flex flex-col px-[55px] py-[36px] rounded-[21px] ">
        <img width={310} height={198} src="logo-2.svg"></img>
        <form className="flex flex-col justify-center items-center">
          <input
            value={full_name}
            onChange={(e) => setFullname(e.target.value)}
            autoComplete="name"
            className="w-[111%] bg-[#F1F1F1] p-[12px] text-[17px] rounded-[15px] outline-0 border-1 border-[#b4b4b4ee] mt-5"
            placeholder="Full Name"
            type="text"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-[111%] bg-[#F1F1F1] p-[12px] text-[17px] rounded-[15px] outline-0 border-1 border-[#b4b4b4ee] mt-5"
            placeholder="email"
           
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            className="w-[111%] bg-[#F1F1F1] p-[12px] text-[17px] rounded-[15px] outline-0 border-1 border-[#b4b4b4ee] mt-5"
            placeholder="username"
            type="text"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="currunt-password"
            className="w-[110%] bg-[#F1F1F1] p-[12px] text-[17px] rounded-[15px] outline-0 border-1 border-[#b4b4b4ee] mt-5"
            placeholder="password"
            type="password"
          />
          <div className="w-[100%] mt-3 mr-6">
            <label className="font-semibold" htmlFor="role">
              role:
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-[110%] bg-[#F1F1F1] p-[12px]  text-[17px] rounded-[15px] outline-0 border-1 border-[#b4b4b4ee] "
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button onClick={e=>handleSignup(e)} className="w-[80%] border-1  text-center transition ease-in font-light text-xl  text-white bg-primary mt-8 px-7 py-3 rounded-[10px] hover:bg-white cursor-pointer hover:text-primary hover:border-primary drop-shadow-md">
            {authLoading ?"Loading...":"Sign up"}
          </button>
          <Link
            className="text-center font-lex text-[#464646] hover:underline mt-3.5"
            to={"/login"}
          >
            have an account?
          </Link>
        </form>
      </div>
    </main>
  );
}

export default Signup;
