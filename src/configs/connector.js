import axios from "axios";

const createConnector = () => {
  const config = {};
  const accessToken = localStorage.getItem("credentials")
    ? JSON.parse(localStorage.getItem("credentials")).accessToken
    : null;
  if (accessToken) {
    config.headers = {
      Authorization: "Bearer " + accessToken,
    };
  }
  return axios.create(config);
};

export default createConnector();
