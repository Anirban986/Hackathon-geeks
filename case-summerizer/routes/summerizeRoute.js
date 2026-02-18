const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { summarizeCase } = require("../controllers/summerizeController");

const router = express.Router();

// ensure uploads folder exists
const uploadPath = "uploads/";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/summarize", upload.single("file"), summarizeCase);

module.exports = router;
