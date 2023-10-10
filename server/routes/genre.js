import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import { create, update, remove, list, read } from "../controllers/genre.js";

router.post("/genre", requireSignin, isAdmin, create);
router.put("/genre/:genreId", requireSignin, isAdmin, update);
router.delete("/genre/:genreId", requireSignin, isAdmin, remove);
router.get("/genres", list);
router.get("/genre/:slug", read);

export default router;
