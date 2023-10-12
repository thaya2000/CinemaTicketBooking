import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import {
  create,
  list,
  read,
  poster,
  remove,
  update,
} from "../controllers/movie.js";

router.post("/movie", requireSignin, isAdmin, formidable(), create);
router.get("/movies", list);
router.get("/movie/:slug", read);
router.get("/movie/poster/:movieId", poster);
router.delete("/movie/:movieId", requireSignin, isAdmin, remove);
router.put("/movie/:movieId", requireSignin, isAdmin, formidable(), update);

export default router;
