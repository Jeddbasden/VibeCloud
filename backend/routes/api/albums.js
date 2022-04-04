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

    const songs = await Song.findAll();

    res.json({ albums, users, songs });
  })
);

router.patch(
  "/:albumId/:songId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const albumId = req.params.albumId
    const songId = req.params.songId

    const song = await Song.findByPk(songId)

    if (song) song.update({
      albumId: Number(albumId)
    })

    res.json({song});
  })
)

module.exports = router
