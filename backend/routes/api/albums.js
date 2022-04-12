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
  
router.post("/add",
  requireAuth,
  asyncHandler(async (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const userId = req.body.userId;

    const newAlbum = await Album.create({
      userId,
      title,
      imageUrl,
      genre: "music"
    })

    const albums = await Album.findAll()
    res.json({albums})
  })
)

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

router.delete(
  "/:albumId/delete",
  requireAuth,
  asyncHandler(async (req, res) => {
    const albumId = req.params.albumId;
    const album = await Album.findByPk(albumId)

    await album.destroy();

    const albums = await Album.findAll()
    
    res.json({albums})
  })
)

module.exports = router
