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
  }
});

const upload = multer({ storage: storage }).single("file");

router.post("/image", auth, async (req, res, next) => {
  upload(req, res, err => {
    if (err) {
      return req.status(500).send(err);
    }
    return res.json({fileName:res.req.file.filename})
  });
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
