const auth = require("./auth.router");
const { Router } = require("express");
const router = Router();
router.use("/", auth);

module.exports = router; 
