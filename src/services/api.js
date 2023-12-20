//arquivo para deixar as configs do axios

import axios from "axios";

export const api = axios.create({
  baseURL: "https://rocketnotes-api-12.onrender.com",
});
