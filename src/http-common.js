import axios from "axios"

const qs = require("qs")

export default axios.create({
  baseURL: "https://localhost:44308/api",
  headers: {
    "Content-type": "application/json",
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" })
  },
})
