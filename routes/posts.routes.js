import express from "express";
import {
  getAllPosts,
  createPosts
//   ,
//   updateTravels,
//   deleteTravels,
} from "../src/controllers/posts.controllers.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPosts);
// router.put("/travels/:id", updateTravels);
// router.delete("/travels/:id", deleteTravels);

export default router;
