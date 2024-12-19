const express = require("express");
const User = require("../models/User");
const Product = require('../models/Product');
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// 여기서 두번째 인자 auth는 미들웨어임
router.get("/auth", auth, (req, res) => {
  return res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.post("/register", async (req, res, next) => {
  //유저 데이터 저장
  try {
    // 몽구스 스키마로 만든 User모델에
    // req.body에 있는 유저정보로 user객체 만들고
    const user = new User(req.body);
    // 저장=> 몽고디비에 저장됨
    await user.save();
    // 성공시 성공 status200 전달
    return res.sendStatus(200);
  } catch (error) {
    //실패하면 error 전달(에러처리기로 보내주기)
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    //존재하는 유저인지 확인
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      //user가 없으면 400에러를 보내주고 상태를 끊어줌
      return res.status(400).send("Auth failed, email not found");
    }

    // 비밀번호가 유효한지 확인
    // model/User.js의 userSchema.methods.comparePassword에서 확인
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send("Wrong password");
    }

    // 토큰 생성
    const payload = {
      userId: user._id.toHexString(),
      // .toHexString() => 오브젝트로 되어있는 몽고디비 id를 String으로 바꿔줌
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      // process.env.환경변수 => .env에 들어있는 환경변수 값에 접근
      expiresIn: "1h", //토큰 유효시간 1시간
    });
    //클라이언트에 응답으로 해당 user에 대한 data와 생성한 토큰을 보내줌
    return res.json({ user, accessToken });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", auth, async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post("/cart", auth, async (req, res, next) => {
  try {
    // 먼저 user collection에 해당 유저의 정보를 가져오기
    const userInfo = await User.findOne({ _id: req.user._id });

    // 가져온 정보에서 카트에 넣으려 하는 상품이 이미 있는지 확인
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });

    // 상품이 이미 있을 때
    if (duplicate) {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.body.productId }, // 찾고
        { $inc: { "cart.$.quantity": 1 } }, // 업데이트
        { new: true } // 옵션
      );
      console.log("??", _id, cart);
      return res.status(201).send(user.cart);
    }
    // 상품이 있지 않을 떄
    else {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true }
      );
      return res.status(201).send(user.cart);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/cart", auth, async (req, res, next) => {
  try {
    // 먼저 cart 안에 지울고 한 상품 지워주기
    const userInfo = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        "$pull": { "cart": { "id": req.query.productId } },
      },
      { new: true }
    );

    const cart = userInfo.cart;
    const array = cart.map((item) => {
      return item.id;
    });

    const productInfo = await Product
      .find({ _id: { $in: array } })
      .populate("writer");

    return res.json({
      productInfo,
      cart,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
