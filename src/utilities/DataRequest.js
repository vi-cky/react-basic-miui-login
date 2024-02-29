import axios from "./axios";
import { REACT_APP_API_URL } from "../constants";

const xhrClient = {
  async requestBase(
    route,
    requestMethod,
    customReqHeader,
    data,
    params,
    responseType = "json",
    requestConfig = null
  ) {
    const request = {
      method: requestMethod,
      url: `${REACT_APP_API_URL}${route}`,
      responseType,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "",
      },
      params,
    };
    if (requestMethod !== "get") {
      request.data = data;
    }
    if (requestConfig) {
      request.config = requestConfig;
    }
    return await axios(request)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.data;
      });
  },

  async get(
    route,
    customReqHeader = null,
    data = null,
    responseType = "json",
    params = {}
  ) {
    return await this.requestBase(
      route,
      "get",
      customReqHeader,
      data,
      params,
      responseType
    );
  },
  async post(
    route,
    customReqHeader = null,
    data = null,
    responseType = "json",
    params = {},
    requestConfig = null
  ) {
    return this.requestBase(
      route,
      "post",
      customReqHeader,
      data,
      params,
      responseType,
      requestConfig
    );
  },
  async put(
    route,
    customReqHeader = null,
    data = null,
    responseType = "json",
    params = {}
  ) {
    return this.requestBase(
      route,
      "put",
      customReqHeader,
      data,
      params,
      responseType
    );
  },
};

export default xhrClient;
