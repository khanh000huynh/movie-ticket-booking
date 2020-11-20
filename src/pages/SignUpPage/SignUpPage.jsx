import React from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import WithHeaderAndFooter from "../WithHeaderAndFooter/WithHeaderAndFooter";

const SignUpPage = () => {
  return (
    <WithHeaderAndFooter>
      <SignUpForm />
    </WithHeaderAndFooter>
  );
};

export default SignUpPage;
