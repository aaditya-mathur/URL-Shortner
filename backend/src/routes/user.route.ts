import express from "express";
import { login, logoutUser, signUp } from "../controllers/user.controller.js";
import {
  verifyJwt,
  ensureAuthenticated,
} from "../middlewares/auth.middleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const loginShortenLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: 'Too many login attempts, please try again later.' }
});

router.post("/signup", signUp);
router.post("/login",loginShortenLimiter , login);
router.post("/logout", verifyJwt, ensureAuthenticated, logoutUser);

export default router;
