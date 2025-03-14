import express from "express";
import {
  getAllPosts,
  createPosts,
  updatePost,
  deletePost,
} from "../src/controllers/posts.controllers.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPosts);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
