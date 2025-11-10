import { z } from "zod";

export const signUpPostRequestBodySchema = z.object({
    email : z.email(),
    name : z.string().min(1,"first name is required"),
    username : z.string().min(1,"last name is required"),
    password : z.string().min(8,"password must contain atleast 8 characters")
                .regex(/[A-Z]/,"password must contain atleast one uppercase character")
                .regex(/[a-z]/,"password must contain atleast one lowercase character")
                .regex(/[0-9]/,"password must contain atleast one number")
                .regex(/[^A-Za-z0-9]/, "password must contain at least one special character")
});

export const loginPostRequestBodySchema = z.object({
    username : z.string().min(1,"username is required").optional(),
    email : z.email().optional(),
    password : z.string().min(1,"password is required"),
}).refine((data) => data.email || data.username , {
    message : "either email or username is required"
});

export const shortenPostRequestBodySchema = z.object({
    targetUrl : z.url().min(1,"target url is required"),
    shortCode : z.string().optional(),
});

export const updatePostRequestBodySchema = z.object({
    targetUrl : z.url().min(1,"target url is required to update"),
})