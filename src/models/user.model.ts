import mongoose,{ Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
    firstName : string;
    lastName : string;
    email : string;
    password : string;
    createdAt : Date;
    updatedAt : Date;
}

const userSchema = new Schema<IUser>({
    firstName : {
        type : String,
        required : true,
        trim : true,
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
    },
    password : {
        type : String,
        required : true,
    },
},{timestamps : true});

//pre hook for hashing password
userSchema.pre("save",async function (next) {
    if(!this.isModified("password"))
    {
        return next() ;
    }
    this.password = await bcrypt.hash(this.password,10);
});


export const User = mongoose.model("User",userSchema);