import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { shortenPostRequestBodySchema, updatePostRequestBodySchema } from "../validations/request.validation";
import { ApiError, ApiResponse } from "../utils/utils.index";
import { allTheUrls, createShortCode, deleteUrl, findExistingCode, getExistingCode ,updateUrl } from "../services/url.service";

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
});

export const getallUrlsByTheUser = asyncHandler( async(req : any ,res : Response ) => {

    const userId = req.user._id;

    const allUrls = await allTheUrls(userId);

    if(!allUrls)
    {
        throw new ApiError(400,"request failed , please try again");
    }
    res.status(200).json(new ApiResponse(200 ,{ allUrls }));
});

export const deleteEntryByTheUser = asyncHandler( async( req : any ,res : Response ) => {

    const urlId = req.params.id;
    const userId : string = req.user._id;

    const deletedUrl = await deleteUrl(userId ,urlId);
    if(!deletedUrl)
    {
        throw new ApiError(404,"url not found ,or not owned by you");
    }

    return res.status(200).json( new ApiResponse( 200,{ deletedUrl },"url successfully deleted" ));
})

export const updateUrlEntry = asyncHandler( async(req : any ,res : Response ) => {
    const urlId = req.params.id;
    const userId : string = req.user._id;

    const validationResult = await updatePostRequestBodySchema.safeParseAsync(req.body);

    if(!validationResult.success)
    {
        throw new ApiError(400,"validation failed",[validationResult.error.format()]);
    }
    const { targetUrl } = validationResult.data;

    const updatedUrl = await updateUrl(userId ,urlId ,targetUrl);

    if (!updatedUrl) {
      throw new ApiError(404, "URL not found or not owned by you");
    }

    return res.status(200).json(new ApiResponse(200,{ updatedUrl },"url successfully updated"));
});

export const getUrl = asyncHandler(async (req : any ,res : Response ) => {
    
    const urlId = req.params.id;
    const userId : string = req.user._id;
    const existingCode = await getExistingCode(userId ,urlId);

    if(!existingCode)
    {
        throw new ApiError(404,"url with this id does not exist");
    }

   return res.status(200).json(new ApiResponse(200,{ existingCode }));
})
