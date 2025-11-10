import express from "express";
import { ensureAuthenticated, verifyJwt } from "../middlewares/auth.middleware";
import { createUrl, deleteEntryByTheUser, getallUrlsByTheUser, getUrl, updateUrlEntry } from "../controllers/url.controller";

const router = express.Router();

router.post("/shorten" ,verifyJwt ,ensureAuthenticated ,createUrl);
router.get("/codes",verifyJwt ,ensureAuthenticated ,getallUrlsByTheUser);
router.delete("/codes/:id" ,verifyJwt ,ensureAuthenticated ,deleteEntryByTheUser);
router.patch("/codes/:id" ,verifyJwt ,ensureAuthenticated ,updateUrlEntry);
router.get("/codes/:id" ,verifyJwt ,ensureAuthenticated , getUrl);


export default router;