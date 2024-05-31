import React, { useState } from "react";
import "../css/form.css";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Toast from "./Toast";

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userEmail: "",
    queryType: "",
    userMessage: "",
    consent: false,
  });

  const [formValid, setFormValid] = useState({
    firstName: true,
    lastName: true,
    userEmail: true,
    queryType: true,
    userMessage: true,
    consent: true,
  });
  const [isToastOpen, setToastOpen] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevVal) => ({
      ...prevVal,
      [name]: type === "checkbox" ? checked : value,
    }));

    setFormValid((prevValid) => ({
      ...prevValid,
      [name]: true, // Reset the validation state for the changed field
    }));
  };

  const handleSubmission = (event) => {
    event.preventDefault();

    let isValid = true;
    let newFormValid = { ...formValid };

    if (!formData.firstName) {
      newFormValid.firstName = false;
      isValid = false;
    }
    if (!formData.lastName) {
      newFormValid.lastName = false;
      isValid = false;
    }
    if (!formData.userEmail) {
      newFormValid.userEmail = false;
      isValid = false;
    } else if (!emailRegex.test(formData.userEmail)) {
      newFormValid.userEmail = false;
      isValid = false;
    }
    if (!formData.queryType) {
      newFormValid.queryType = false;
      isValid = false;
    }
    if (!formData.userMessage) {
      newFormValid.userMessage = false;
      isValid = false;
    }
    if (!formData.consent) {
      newFormValid.consent = false;
      isValid = false;
    }

    setFormValid(newFormValid);

    if (isValid) {
      // Form is valid, proceed with submission
      setToastOpen(true);
      setTimeout(() => setToastOpen(false), 5000); // Automatically close the toast after 5 seconds
      setFormData(
        {
          firstName: "",
          lastName: "",
          userEmail: "",
          queryType: "",
          userMessage: "",
          consent: false,
        }
      )
    } 
  };
  const handleToastClose = () => {
    setToastOpen(false);

  };
  return (
    <>
      {isToastOpen && <Toast onClose={handleToastClose} />}

     

        <form onSubmit={handleSubmission} noValidate autoComplete="off">
          <div className="name-email-container">
            <TextField
              value={formData.firstName}
              required
              label="First Name"
              name="firstName"
              variant="outlined"
              className="item firstName"
              onChange={handleChange}
              error={!formValid.firstName}
              helperText={!formValid.firstName && "This field is required"}
            />
            <TextField
              value={formData.lastName}
              required
              label="Last Name"
              name="lastName"
              variant="outlined"
              className="item lastName"
              onChange={handleChange}
              error={!formValid.lastName}
              helperText={!formValid.lastName && "This field is required"}
            />
            <TextField
              value={formData.userEmail}
              required
              label="Email Address"
              name="userEmail"
              variant="outlined"
              className="item userEmail"
              onChange={handleChange}
              error={!formValid.userEmail}
              helperText={
                !formValid.userEmail &&
                (formData.userEmail
                  ? "Invalid email address"
                  : "Email is required")
              }
              fullWidth
            />
          </div>

          <div className="query-type-wrapper">
            <label className="field-name-label">
              Query Type <span>*</span>
            </label>
            <RadioGroup
              row
              aria-label="queryType"
              name="queryType"
              value={formData.queryType}
              onChange={handleChange}
              required
              error={!formValid.queryType}
            >
              <div className="query-type-container">
                <div className="custom-container">
                  <FormControlLabel
                    control={
                      <Radio
                        className="custom-radio"
                        checked={formData.queryType === "General Enquiry"}
                        value="General Enquiry"
                        name="queryType"
                        onChange={handleChange}
                      />
                    }
                    label="General Enquiry"
                  />
                </div>
                <div className="custom-container">
                  <FormControlLabel
                    control={
                      <Radio
                        className="custom-radio"
                        checked={formData.queryType === "Support Request"}
                        value="Support Request"
                        name="queryType"
                        onChange={handleChange}
                      />
                    }
                    label="Support Request"
                  />
                </div>
                {!formValid.queryType && (
                  <p className="error-text">Please select a query type</p>
                )}
              </div>
            </RadioGroup>
          </div>

          <div className="my-text-area">
            <label id="outlined-multiline-static" className="field-name-label">
              Message <span>*</span>
            </label>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={3}
              fullWidth
              value={formData.userMessage}
              name="userMessage"
              onChange={handleChange}
              error={!formValid.userMessage}
              helperText={!formValid.userMessage && "Message is required"}
            />
          </div>

          <div className="check-box-container">
            <FormControlLabel
              required
              control={
                <Checkbox
                  checked={formData.consent}
                  name="consent"
                  onChange={handleChange}
                />
              }
              label="I consent to being contacted by the team"
            />
            {!formValid.consent && (
              <p className="error-text">
                To submit this form, please consent to being contacted
              </p>
            )}
          </div>
          <div className="button-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      
    </>
  );
}

export default Form;
