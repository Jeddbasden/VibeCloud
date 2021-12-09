const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const homeRouter = require("./home")
const asyncHandler = require("express-async-handler");
const {User, Song, Album, } = require('../../db/models')

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/home", homeRouter);


module.exports = router;
