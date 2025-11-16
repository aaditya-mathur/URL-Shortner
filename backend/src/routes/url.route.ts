import express from "express";
import { ensureAuthenticated, verifyJwt } from "../middlewares/auth.middleware";
import {
  createUrl,
  deleteEntryByTheUser,
  getallUrlsByTheUser,
  getUrl,
  updateUrlEntry,
} from "../controllers/url.controller";
import rateLimit from "express-rate-limit";

const router = express.Router();

const urlShortenLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: 'Too many URLs created, please try again later.' }
});

router.post("/shorten", verifyJwt, ensureAuthenticated, urlShortenLimiter , createUrl);
router.get("/codes", verifyJwt, ensureAuthenticated, getallUrlsByTheUser);
router.delete(
  "/codes/:id",
  verifyJwt,
  ensureAuthenticated,
  deleteEntryByTheUser
);
router.patch("/codes/:id", verifyJwt, ensureAuthenticated, updateUrlEntry);
router.get("/codes/:id", verifyJwt, ensureAuthenticated, getUrl);

export default router;
