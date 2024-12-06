
const express = require("express")
const multer = require("multer")

const bookController = require("../controllers/bookController")
const {protect} = require("../controllers/authController")

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router()

router.use(protect)

router.route("/").get(bookController.getBooks).post(upload.single("image"), bookController.createBook)

router.route("/:bookId").get(bookController.getABook).patch(upload.single("image"), bookController.updateBook).delete(bookController.deleteBook)


module.exports = router
