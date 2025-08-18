const express = require("express");
const router = express.Router();

const {
    createUser,
    getAllUsers,
    getOneUser
} = require("../controller/usersController");

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getOneUser);

module.exports = router;
