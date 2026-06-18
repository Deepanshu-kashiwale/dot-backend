const express=require("express")
const router=express.Router()

const { loginuser }=require("../controllers/authController");
//const { login } = require("../controllers/authController");
router.post("/login",loginuser)

module.exports=router;