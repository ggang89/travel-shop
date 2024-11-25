import axios from "axios";

const axiosInstance = axios.create({
  //baseURL=>중복된 주소를 인스튼스 생성시 baseURL에 넣어줌
  baseURL: import.meta.env.PROD ? "" : "http://localhost:4000",
  //vite에서 환경변수 사용시 => import.meta.env.환경변수 이름
});

export default axiosInstance;
