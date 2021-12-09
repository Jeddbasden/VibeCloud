const express = require("express");
const { User, Song, Album } = require("../../db/models");
const asyncHandler = require("express-async-handler");
const { requireAuth, restoreUser } = require("../../utils/auth");
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const router = express.Router();


router.post('/', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  const { songTitle, songUrl, songImgUrl } = req.body
  
  const newSong = await Song.create({
    title: songTitle,
    imageUrl: songImgUrl,
    songUrl,
  })

  const song = await Song.findByPk(newSong.id)

  if (song) {
    res.json({message: "success"})
  }else res.json({message: "failed :("})
  
}))

module.exports = router
