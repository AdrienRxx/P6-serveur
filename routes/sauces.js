const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.js");
const saucesCtrl = require("../controllers/sauces.js");
const multer = require("../middlewares/multer-config.js");

router.post("/", auth, multer, saucesCtrl.createSauces);
router.get("/", auth, saucesCtrl.getAllSauces);
router.get("/:id", auth, saucesCtrl.getOneSauces);
router.put("/:id", auth, multer, saucesCtrl.modifySauces);
router.delete("/:id", auth, saucesCtrl.deleteSauces);

module.exports = router;
