const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/Product");
const multer = require("multer");

const storage = multer.diskStorage({
  // 파일 업로드 할 경로
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // upload 폴더에 넣어준다
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image", auth, async (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return req.status(500).send(err);
    }
    return res.json({ fileName: res.req.file.filename });
  });
});

// 아무나 가져올 수 있도록 auth 미들웨어 삭제
router.get("/", async (req, res, nest) => {
  //asc 오름차순  ,  desc  내림차순
  const order = req.query.order ? req.query.order : "desc";
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const skip = req.query.skip ? Number(req.query.skip) : 0;

  let findArgs = {};
  for (let key in req.query.filters) {
    if (req.query.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          // Greater than equal
          $gte:req.query.filters[key][0],
          // Less than equal
          $lte:req.query.filters[key][1]
        };
       
      } else {
         findArgs[key] = req.query.filters[key];

      }
    }
  }
console.log(findArgs)

  try {
    const products = await Product.find(findArgs)
      .populate("writer") // populate => 해당 유저의 모든 데이터를 가져옴
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);

    const productsTotal = await Product.countDocuments(findArgs);
    // skip+limit이 전체 갯수보다 작으면 hasMore이 true라서 더보기 버튼이 보임
    const hasMore = skip + limit < productsTotal ? true : false;
    console.log(products);
    return res.status(200).json({
      products,
      hasMore,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const product = new Product(req.body);
    product.save();
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
