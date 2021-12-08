const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const homeRouter = require("./home")
const {User, Song, Album, } = require('../../db/models')

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/home", homeRouter);

router.get("/", (req, res) => {

})

module.exports = router;
