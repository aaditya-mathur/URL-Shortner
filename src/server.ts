import express,{Request, Response, NextFunction} from "express";
import userRouter from "./routes/user.route.js";
import urlRouter from "./routes/url.route.js";
import cookieParser from "cookie-parser";
import { redirectToUrl } from "./controllers/url.controller.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use("/api/v1/user" ,userRouter);
app.use("/api/v1/url" ,urlRouter);

app.get("/:shortCode" ,redirectToUrl)


app.use((err : any ,req : Request ,res : Response ,next : NextFunction) => {
    res.status(err.statusCode || 500).json({
        message : err.message || "Internal server Error",
        errors : err.errors || []
    })
});


export default app;