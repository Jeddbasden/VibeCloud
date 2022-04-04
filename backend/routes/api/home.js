const express = require("express")
const {User, Song, Album, Like, Comment} = require("../../db/models")
const asyncHandler = require('express-async-handler')
const { requireAuth, restoreUser } = require('../../utils/auth')

const router = express.Router();


router.get("/", requireAuth, restoreUser, asyncHandler(async (req, res) => {
  const songs = await Song.findAll({
    order: [
      ['id', 'ASC'],
    ]
  });
  const albums = await Album.findAll({
    order: [["id", "ASC"]],
  });
  const userId = req.user.id;
  const user = await User.findByPk(userId);
  const comments = await Comment.findAll({
    order: [["id", "ASC"]],
  });
  const likes = await Like.findAll({
    where: {
      userId,
    },
    order: [
      ['id', 'ASC']
    ]
  });
  
  const likedSongs = [];

  songs.map(song => {
    likes.map(like => {
      if (like.songId === song.id) {
        likedSongs.push(song);
      };
    });
  });

  res.send({
    songs,
    albums,
    user,
    comments,
    likedSongs
  })
}));

module.exports = router;
