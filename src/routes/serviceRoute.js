const express = require("express")
const multer = require("multer")

const serviceController = require("../controllers/serviceController")
const {protect} = require("../controllers/authController")

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router()

router.use(protect)

router.route("/").get(serviceController.getServices).post(upload.single("image"), serviceController.createService)

router.route("/:serviceId").get(serviceController.getAService).patch(upload.single("image"), serviceController.updateService).delete(serviceController.deleteService)


module.exports = router
