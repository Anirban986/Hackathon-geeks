const express = require("express");
const multer = require("multer");
const { summarizeCase } = require("../controllers/summerizeController");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/summarize", upload.single("file"), summarizeCase);

module.exports = router;
