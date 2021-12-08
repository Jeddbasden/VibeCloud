const router = require('express').Router()
const {User, Song, Album, Like, Comment} = require("../../db/models")
const asyncHandler = require('express-async-handler')
const { requireAuth, restoreUser } = require('../../utils/auth')
const jwt = require('jsonwebtoken');



router.get("/", requireAuth, restoreUser, asyncHandler(async (req, res) => {
  const songs = await Song.findAll();
  const albums = await Album.findAll();
  const userId = req.user.id;
  const user = await User.findByPk(userId);
  const comments = await Comment.findAll();
  const likes = await Like.findAll({
    where: {
      userId,
    }
  });
  
  const likedSongs = [];

  songs.map(song => {
    likes.map(like => {
      if (like.songId === song.id) {
        likedSongs.push(song);
      };
    });
  });

  res.json({
    songs,
    albums,
    user,
    comments,
    likedSongs
  })
}));

module.exports = router;
