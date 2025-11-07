import express,{Request, Response} from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.get("/",(req : Request,res :  Response) => {
    res.json({message : "hello"});
})

export default app;