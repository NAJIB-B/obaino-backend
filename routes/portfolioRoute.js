const multer = require("multer");
const express = require("express");

const portfolioController = require("../controllers/portfolioController");
const { protect } = require("../controllers/authController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(portfolioController.getPortfolio)
  .post(upload.single("image"), portfolioController.createPortfolio)
  .patch(upload.single("image"), portfolioController.updatePortfolio);

router.route("/video").patch(portfolioController.updateVideo)

module.exports = router;
