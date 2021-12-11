const express = require("express");
const { User, Song, Album } = require("../../db/models");
const asyncHandler = require("express-async-handler");
const { requireAuth, restoreUser } = require("../../utils/auth");
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });


const router = express.Router();


router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const { songTitle, songUrl, songImgUrl } = req.body;
  const userId = req.user.id;
  const newSong = await Song.create({
    userId,
    title: songTitle,
    imageUrl: songImgUrl,
    songUrl,
  });

  res.json(newSong);
  
}));

router.delete("/:id", requireAuth, asyncHandler(async (req, res) => {
  const songId = req.params.id;
  const song = await Song.findByPk(songId);

  await song.destroy();

  res.json({message: 'Success'})

}));

router.patch("/edit/:id", requireAuth, asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { songTitle, songUrl, songImgUrl } = req.body;
  const song = await Song.findByPk(id);
  if (song) {
    await song.update({
      title: songTitle,
      songUrl: songUrl,
      imgUrl: songImgUrl,
    });
  }

  const updatedSong = await Song.findByPk(id);

  res.json( updatedSong )
}))


module.exports = router
