const express = require("express");
const { Comment } = require("../../db/models");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

router.post("/", requireAuth, asyncHandler(async (req, res) => {
  const { comment, songId } = req.body;
  const userId = req.user.id;
  const newComment = await Comment.create({
    userId,
    songId,
    comment,
  })

  res.json(newComment)
}))

router.delete("/:id", requireAuth, asyncHandler(async (req, res) => {
  const id = req.params.id;

  const comment = await Comment.findByPk(id);

  await comment.destroy();

  res.json({ message: "Success" });
}))

module.exports = router