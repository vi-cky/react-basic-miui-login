import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (requestConfig) => {
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      /*
      if (error.response.status === 401 && !error.config._retry) {
       
        error.config._retry = true;
        try {
          const rs = await refreshToken();
          const { accessToken } = rs.data;
          localStorage.setItem("accessToken", accessToken);
          axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(error.config);
        } catch (e) {
          return Promise.reject(e);
        }
        
      }
      console.log("error in axios......", error);
    return Promise.reject(error);
       */
    }
    return null;
  }
);

/*const refreshToken = () => {
  axiosInstance.post("/auth/refreshtoken", {
    refreshToken: localStorage.getItem("refreshToken"),
  });
};
*/
export default axiosInstance;
