const express = require("express")

const {addEmailSubscriber} = require("../controllers/emailController")


const router = express.Router();


router.post("/", addEmailSubscriber);


module.exports = router
