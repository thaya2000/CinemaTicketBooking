import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import { create, update, remove, list, read } from "../controllers/actor.js";

router.post("/actor", requireSignin, isAdmin, create);
router.put("/actor/:actorId", requireSignin, isAdmin, update);
router.delete("/actor/:actorId", requireSignin, isAdmin, remove);
router.get("/actors", list);
router.get("/actor/:actorId", read);

export default router;
