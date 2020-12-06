import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const WithHeaderAndFooter = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default WithHeaderAndFooter;
