import { Url, IUrl } from "../models/models.index.js";
import { nanoid } from "nanoid";

// TO FIND EXISTING SHORT CODE
export const findExistingCode = async (
  shortCode: string
): Promise<IUrl | null> => {
  try {
    const existingCode = await Url.findOne({ shortCode });
    return existingCode;
  } catch (error) {
    console.error(`error occured while fetching existing shortCode`);
    return null;
  }
};

// TO CREATE NEW SHORT CODE
export const createShortCode = async (
  targetUrl: string,
  userId: string,
  shortCode?: string
): Promise<IUrl | null> => {
  try {
    const code = shortCode || nanoid(6);
    const newShortCode = new Url({ targetUrl, shortCode: code, userId });
    await newShortCode.save();
    return newShortCode;
  } catch (error) {
    return null;
  }
};

// TO GET ALL THE URLS CREATED BYT THE LOGGED IN USER
export const allTheUrls = async (userId: string): Promise<IUrl[] | null> => {
  try {
    const allUrls = await Url.find({ userId });
    return allUrls;
  } catch (error) {
    console.error("error while fetching all the urls created by User");
    return null;
  }
};

// TO DELETE A PARTICULAR URL
export const deleteUrl = async (
  userId: string,
  urlId: string
): Promise<IUrl | null> => {
  try {
    const deletedUrl = await Url.findOneAndDelete({
      _id: urlId,
      userId: userId,
    });
    return deletedUrl;
  } catch (error) {
    console.error(`Error Deleting Url : ${error}`);
    return null;
  }
};

// TO UPDATE A PARTICULAR URL
export const updateUrl = async (
  userId: string,
  urlId: string,
  targetUrl: string
): Promise<IUrl | null> => {
  try {
    const updatedUrl = await Url.findOneAndUpdate(
      { _id: urlId, userId: userId },
      { targetUrl: targetUrl },
      { new: true }
    );
    return updatedUrl;
  } catch (error) {
    console.error(`Error while updating Url : ${error}`);
    return null;
  }
};

// TO GET SHORTCODE (FOR LOGGED IN USER)
export const getExistingCode = async (
  userId: string,
  urlId: string
): Promise<IUrl | null> => {
  try {
    const existingCode = await Url.findOne({ userId: userId, _id: urlId });
    return existingCode;
  } catch (error) {
    console.error(`Error while fetching existing shortCode ${error}`);
    return null;
  }
};
