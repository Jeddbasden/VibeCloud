const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const homeRouter = require("./home")
const songRouter = require("./songs")
const commentRouter = require("./comments")
const albumsRouter = require("./albums")
const asyncHandler = require("express-async-handler");
const {User, Song, Album, } = require('../../db/models')

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/home", homeRouter);

router.use("/songs", songRouter);

router.use("/comments", commentRouter)

router.use("/albums", albumsRouter)

module.exports = router;
