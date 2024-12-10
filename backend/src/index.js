// entry flie(node.js의 진입점이 되는 파일)

// express 모듈 불러오기
const express = require('express');

//절대 경로를 사용하기 위해 
const path = require('path');

 // 새로운 express 어플 생성
const app = express();

const cors = require('cors');

const port = 4000;

const mongoose = require('mongoose')

//monDB url이 노출되면 안되므로 env파일에 넣어줌
//env파일 사용하려면 dotenv 연결
const dotenv = require('dotenv');
dotenv.config();

//cors문제 해결
//미들웨어 사용시 app.use 로 접근
app.use(cors());

//express.json(): JSON 페이로드로 들어오는 구문을 파싱해준다.
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("연결 완료");
  })
  .catch((err) => {
    console.log(err);
  });


//  "/"이 경로로 요청이 오면 Hellow World 결과값으로 전달
// app.get('/', (req, res) => {
//   res.send('Hello World');
// })

//express로 에러 처리하기 => 에러처리기 등록
app.get('/', (req, res,next) => {
setImmediate(() => {next( new Error("it is an error"))});

})

app.post('/', (req, res) => {
  console.log(req.body);
  res.json(req.body);
})

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));

//에러 처리기
app.use((error, req, res, next) => {
  //express에서 제공하는 status에러 코드가 있으면 그걸 클라이언트에게 전해주고 없으면 500
  res.status(err.status || 500);

  //error메시지 있으면 보내고 없으면 내가 작성한 메시지 보내기
  res.send(error.message || '서버에서 에러가 났습니다');
})


//express.static(경로,파일이 있는 폴더)=>이미지, css, js파일 같은 정적 파일을 제공
//상대경로 사용 => app.use(express.static('/home', 'uploads'));
//절대경로 사용
app.use(express.static(path.join(__dirname, "../uploads")));

//해당 포트와 호스트에서 HTTP 서버 시작
// app.listen(PORT, HOST);
app.listen(port, () => {
  console.log(`${port}에서 실행되었다`)
})
