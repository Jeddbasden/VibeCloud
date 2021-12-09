const express = require("express");
const asyncHandler = require("express-async-handler");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Song, Album, Like } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

router.get("/:id", requireAuth, asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  const likes = await Like.findAll({
    where: {
      userId: user.id
    }
  })
  
  let likedSongs = []
  likes.forEach(async (like) => {
    const song = await Song.findByPk(like.songId)
    likedSongs.push(song)
  });

  const userAlbums = await Album.findAll({
    where: {
      userId: user.id,
    }
  });

  const songs = await Song.findAll()

  const userSongs = await Song.findAll({
    where: {
      userId: user.id,
    }
  })

  res.json({
    user,
    songs,
    likedSongs,
    userAlbums,
    userSongs
  })

}));


module.exports = router;
