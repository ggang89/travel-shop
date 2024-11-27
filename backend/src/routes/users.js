const express = require('express');
const User=require('../models/User')
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get("/auth", auth, (req, res) => {
  
  return res.status(200).json({
    _id:req.user._id,
    email:req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    

  })
 
});


router.post('/register', async(req, res,next) => {
  
  //유저 데이터 저장
  try {
    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);

  } catch (error) {
    next(error)
  }
})

router.post("/login", async (req, res, next) => {

  try {
    //존재하는 유저인지 확인
    const user = await User.findOne({ email: req.body.email });    

    if (!user) {
      //user가 없으면 상태를 끊어줌
      return res.status(400).send("Auth failed, email not found")
    }

    // 비밀번호가 유효한지 확인
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send('Wrong password');
    }

    const payload = {
      userId:user._id.toHexString(),
    }
    // 토큰 생성
    const accessToken=jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'1h'})
    return res.json({ user, accessToken });//클라이언트한테 보내줌 user.data에 넣어주느 payload임

  } catch (error) {
    next(error);
  }
});

module.exports = router;