import mongoose,{ Schema, Types, Document } from "mongoose";

interface IUrl extends Document {
    userId : Types.ObjectId;
    shortCode : string;
    targetUrl : string;
    clicks : number;
    createdAt : Date;
    updatedAt : Date;
}

const urlSchema = new Schema<IUrl>({
    shortCode : {
        type : String,
        required : true,
        unique : true,
    },
    targetUrl : {
        type : String,
        required : true,
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    clicks : {
        type : Number,
        default : 0
    }
},{timestamps : true});

export const Url = mongoose.model("Url",urlSchema);