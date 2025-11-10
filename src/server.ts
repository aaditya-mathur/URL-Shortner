import express,{Request, Response, NextFunction} from "express";
import userRouter from "./routes/user.route.js";
import urlRouter from "./routes/url.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use("/api/v1/user" ,userRouter);
app.use("/api/v1/url" ,urlRouter);


app.use((err : any ,req : Request ,res : Response ,next : NextFunction) => {
    res.status(err.statusCode || 500).json({
        message : err.message || "Internal server Error",
        errors : err.errors || []
    })
});


export default app;