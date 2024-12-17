import axios from "axios";

const axiosInstance = axios.create({
  //baseURL=>중복된 주소를 인스튼스 생성시 baseURL에 넣어줌
  baseURL: import.meta.env.PROD ? "" : "http://localhost:4000",
  //vite에서 환경변수 사용시 => import.meta.env.환경변수 이름
});

//요청이 보내지기 전에 하고 싶은 로직을 작성
axiosInstance.interceptors.request.use(
  function (config) {
    //요청 헤더에 Authorization으로 Bearer 토큰이 같이 요청됨
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("accessToken");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 토큰이 만료되었을 때 다시 reload 해주기
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data === "jwt expired") {
      localStorage.removeItem("accessToken");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
