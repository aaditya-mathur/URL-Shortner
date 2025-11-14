import { User } from "../models/models.index.js";
import { asyncHandler } from "../utils/utils.index.js";
import { ApiError } from "../utils/utils.index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Response } from "express";

dotenv.config();

interface JwtPayload {
  id: string;
}

// FOR CHECKING IF THE TOKEN IS VALID OR NOT
export const verifyJwt = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "unauthorized request");
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      ) as JwtPayload;
      const user = await User.findById(decoded.id).select(
        "-password -passwordResetToken -resetTokenExpiry"
      );

      if (!user) {
        throw new ApiError(401, "Invalid token");
      }

      req.user = user;
      next();
    } catch (error) {
      throw new ApiError(400, "Invalid or expired token");
    }
  }
);

// FOR ENSURING IF USER IS LOGGED IN
export const ensureAuthenticated = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "you are not logged in " });
  }

  return next();
};
