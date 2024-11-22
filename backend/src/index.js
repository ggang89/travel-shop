// entry fiel(node.js의 진입점이 되는 파일)

// express 모듈 불러오기
const express = require('express');

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
app.get('/', (req, res) => {
  res.send('ddkddkdkdk00');
})

app.listen(port, () => {
  console.log(`${port}에서 실행되었다`)
})
