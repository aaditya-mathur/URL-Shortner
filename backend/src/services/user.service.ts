import { User, IUser } from "../models/models.index.js";

// TO FIND EXISTING USER
export const findExistingUser = async (email : string,username? : string): Promise<IUser | null > => {
  try {
    const existingUser = await User.findOne({ $or : [
      {email : email},
      {username : username},
    ] });
    return existingUser;
  } catch (error) {
    console.error(`Error occurred while searching for existing user ${error}`);
    return null;
  }
};

// FOR CREATING NEW USER
export const createUser = async (
  name : string,
  username : string,
  email : string,
  password : string
): Promise< IUser | null > => {
  try {
    const newUser = new User({ name, username, email, password });
    await newUser.save();
    const newUserToReturn = await User.findById(newUser._id).select("-password");
    return newUserToReturn;
  } catch (error) {
    console.error(`Something went wrong while creating the user ${error}`);
    return null;
  }
};
