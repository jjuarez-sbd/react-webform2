import React, { useEffect } from "react";
import { Well } from "@zendeskgarden/react-notifications";
import ReactDOM from "react-dom";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import "./styles.css";
import "./styles-custom.css";

const CallToActionHeader = (props) => (
  <div className="web-form-call-to-action">{props.text}</div>
);

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

// And now we can use these
const SignupForm = () => {
  return (
    <>
      <Well className="well-container">
        <h1>Need Help</h1>
        <CallToActionHeader
          className="call-to-action"
          justifyContent="center"
          text="🤗 Stuck? Don't Worry! Request a Callback from Our Caring Customer Service Heroes"
        />
        <CallToActionHeader
          className="call-to-action"
          text=" Just Fill Out This Easy Form and We'll Call You Back in a Flash! ⚡️"
        />
        <Formik
          initialValues={{
            FullName: "",
            email: "",
            phone: "",
            acceptedTerms: false // added for our checkbox
          }}
          validationSchema={Yup.object({
            FullName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email addresss`")
              .required("Required"),
            acceptedTerms: Yup.boolean()
              .required("Required")
              .oneOf([true], "You must accept the terms and conditions."),
            jobType: Yup.string()
              // specify the set of valid values for job type
              // @see http://bit.ly/yup-mixed-oneOf
              .oneOf(
                ["designer", "development", "product", "other"],
                "Invalid Job Type"
              )
              .required("Required")
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await new Promise((r) => setTimeout(r, 500));
            setSubmitting(false);
          }}>
          <div className="form-container">
            <Form>
              <MyTextInput
                label="Full  Name"
                name="FullName"
                type="text"
                placeholder="Please enter your name"
              />
              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="Please enter your email addresss"
              />
              <MyTextInput
                label="Phone Number"
                name="phone"
                type="text"
                placeholder="(xxx)-xxx-xxxx"
              />

              <MyCheckbox name="acceptedTerms">
                I accept the terms and conditions
              </MyCheckbox>

              <button type="submit">Submit</button>
            </Form>
          </div>
        </Formik>
      </Well>
    </>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
