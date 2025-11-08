import { signUpPostRequestBodySchema } from "../validations/request.validation";
import { Request, Response } from "express";
import { createUser, findExistingUser } from "../services/user.service.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/utils.index.js";

export const signUp = asyncHandler( async (req : Request,res : Response)  => {

    const validationResult = await signUpPostRequestBodySchema.safeParseAsync(req.body);

    if(!validationResult.success)
    {
        throw new ApiError(400 ,"validation failed",[validationResult.error.format()]);
    }

    const {name, username, email, password} = validationResult.data;

    const existingUser = await findExistingUser(email);

    if(existingUser)
    {
        throw new ApiError(400 ,`User with email ${email} already exists`);
    }

    const newUser = await createUser(name ,username ,email , password );

    if(!newUser)
    {
        throw new ApiError(500 ,"something went wrong while creating the user");
    }

    return res.status(200).json(new ApiResponse(200,newUser,"user created successfully"));
});