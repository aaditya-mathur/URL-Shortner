import express,{Request, Response, NextFunction} from "express";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use("/api/v1",userRouter);


app.use((err : any ,req : Request ,res : Response ,next : NextFunction) => {
    res.status(err.statusCode || 500).json({
        message : err.message || "Internal server Error",
        errors : err.errors || []
    })
});


export default app;