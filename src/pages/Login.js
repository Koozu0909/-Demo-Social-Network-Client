import React, { useContext, useState } from "react";
import axios from "axios";
import {useNavigate  } from "react-router-dom";
import {AuthContext}  from '../helpers/AuthContext'


function Login() {
  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");
  const {setAuthState}  = useContext(AuthContext)

  let navigate = useNavigate()

  const login = () => {
    const data = { username: username, password: password };
    axios.post("https://minor-eggnog-production.up.railway.app/auth/login", data).then((res) => {
        if(res.data.error){
          alert(res.data.error)
        }else{
          localStorage.setItem("accessToken", res.data.token)
          setAuthState({
            username:res.data.username,
            id:res.data.id,
            status:true,
          });
          navigate("/");
        }
    });
  };
  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );
}

export default Login;