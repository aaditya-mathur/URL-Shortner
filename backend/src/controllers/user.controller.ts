import { loginPostRequestBodySchema, signUpPostRequestBodySchema } from "../validations/request.validation";
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


export const login = asyncHandler( async (req : Request ,res : Response) => {
    const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);

    if(!validationResult.success)
    {
        throw new ApiError(400,"validation failed",[validationResult.error.format()]);
    }

    const { username, email, password } = validationResult.data;

    const existingUser = await findExistingUser(email as string,username as string );
    
    if(!existingUser)
    {
        throw new ApiError(400,"User does not exist make sure provided fields are correct");
    }

    const isPasswordValid = await existingUser.isPasswordCorrect(password);

    if(!isPasswordValid)
    {
        throw new ApiError(401,"incorrect email or password");
    }

    const options = {
    httpOnly: true,
    secure: true,
  };

    const accessToken =  existingUser.generateAccessToken();
    
    return res.status(200).cookie("accessToken",accessToken,options).json(new ApiResponse(200,{ accessToken },"logged in successfully"));
})

export const logoutUser = asyncHandler(async ( req : any ,res : Response ) => {
    
    const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, null, "user logged out successfully"));
})