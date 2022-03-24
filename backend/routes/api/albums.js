const express = require("express");
const { User, Song, Album, Comment } = require("../../db/models");
const asyncHandler = require("express-async-handler");
const { requireAuth, restoreUser } = require("../../utils/auth");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

const router = express.Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {

    const albums = await Album.findAll();

    const users = await User.findAll();

    const songs = await Song.findAll({
      where: {
        albumId: id,
      }
    });

    res.json({ albums, users, songs });
  })
);

module.exports = router
