// entry fiel(node.js의 진입점이 되는 파일)

// express 모듈 불러오기
const express = require('express');

//절대 경로를 사용하기 위해 
const path = require('path');


const cors = require('cors');
// Constants
// express 서버를 위한 포트 설정, 호스트 지정
// const PORT = 8080;
// const HOST = "0.0.0.0";

// // App
// // 새로운 express 어플 생성
// const app = express();

// // "/"이 경로로 요청이 오면 Hellow World 결과값으로 전달
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// //해당 포트와 호스트에서 HTTP 서버 시작
// app.listen(PORT, HOST);
// console.log(`running on http://${HOST}:${PORT}`);

const app = express();
const port = 4000;

//cors문제 해결
//미들웨어 사용시 app.use 로 접근
app.use(cors());

app.get('/', (req, res) => {
  res.send('ddkddkdkdk00');
})

//express.static(경로,파일이 있는 폴더)=>이미지, css, js파일 같은 정적 파일을 제공
//상대경로 사용 => app.use(express.static('/home', 'uploads'));
//절대경로 사용
app.use(express.static(path.join(__dirname, "../uploads")));

app.listen(port, () => {
  console.log(`${port}에서 실행되었다`)
})
