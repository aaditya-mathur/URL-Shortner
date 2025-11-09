import express from "express";
import { ensureAuthenticated, verifyJwt } from "../middlewares/auth.middleware";
import { createUrl } from "../controllers/url.controller";

const router = express.Router();

router.post("/shorten" ,verifyJwt ,ensureAuthenticated ,createUrl);

export default router;