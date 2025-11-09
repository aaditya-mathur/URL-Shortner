import { Url ,IUrl } from "../models/models.index.js";
import { nanoid } from "nanoid";

export const findExistingCode = async (shortCode : string) : Promise<IUrl | null> => {
    try {
        const existingCode = await Url.findOne({shortCode});
        return existingCode;
    } catch (error) {
        console.error(`error occured while fetching existing shortCode`);
        return null;
    }
};

export const createShortCode = async (targetUrl : string ,userId : string ,shortCode? : string) : Promise<IUrl | null> => {
    try {
       const code = shortCode || nanoid(6);
       const newShortCode = new Url({targetUrl , shortCode : code ,userId});
       await newShortCode.save();
       return newShortCode;
    } catch (error) {
        return null;
    }
}