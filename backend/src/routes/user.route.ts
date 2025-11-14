import express from "express";
import { login, logoutUser, signUp } from "../controllers/user.controller.js";
import {
  verifyJwt,
  ensureAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", verifyJwt, ensureAuthenticated, logoutUser);

export default router;
