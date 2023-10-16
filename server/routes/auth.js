import express from "express";

const router = express.Router();

//controllers
import { register, login, secret } from "../controllers/auth.js";

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ ok: true });
});

// testing
router.get("/secret", requireSignin, isAdmin, secret);

export default router;
