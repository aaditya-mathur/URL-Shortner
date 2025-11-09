import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { shortenPostRequestBodySchema } from "../validations/request.validation";
import { ApiError, ApiResponse } from "../utils/utils.index";
import { createShortCode, findExistingCode } from "../services/url.service";

export const createUrl = asyncHandler(async (req : any ,res : Response) => {

    let existingCode;
    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(req.body);

    if(!validationResult.success)
    {
        throw new ApiError(400,"validation failed",[validationResult.error.format()]);
    }

    const { targetUrl ,shortCode } = validationResult.data;
    const userId : string = req.user._id;

    if(shortCode)
    {
      existingCode = await findExistingCode(shortCode as string );
    }

    if(existingCode)
    {
        throw new ApiError(400,"shortCode already exists")
    }

    const newShortCode = await createShortCode(targetUrl ,userId , shortCode as string);

    return res.status(200).json(new ApiResponse(200,{newShortCode},"new shortcode created"));
})