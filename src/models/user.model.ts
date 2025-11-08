import mongoose,{ Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    name : string;
    username : string;
    email : string;
    password : string;
    createdAt : Date;
    updatedAt : Date;
    passwordResetToken? : string;
    resetTokenExpiry?: Date;
}

const userSchema = new Schema<IUser>({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    username : {
        type : String,
        required : true,
        trim : true,
        unique : true,
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
    passwordResetToken : {
        type : String,
    },
    resetTokenExpiry : {
        type : Date,
    }
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