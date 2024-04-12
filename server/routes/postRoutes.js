const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const { createPostController } = require("../controllers/postController");

//router object
const router = express.Router();

// CREATE POST || POST
router.post("/create-post", requireSignIn, createPostController);
//export
module.exports = router;
