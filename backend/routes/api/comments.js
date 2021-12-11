const express = require("express");
const { User, Song, Album, Comment } = require("../../db/models");
const asyncHandler = require("express-async-handler");
const { requireAuth, restoreUser } = require("../../utils/auth");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

const router = express.Router();

router.delete("/:id", requireAuth, asyncHandler(async (req, res) => {
  const id = req.params.id;

  const comment = await Comment.findByPk(id);

  await comment.destroy();

  res.json({ message: "Success" });
}))

module.exports = router
