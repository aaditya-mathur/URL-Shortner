import { User, IUser } from "../models/models.index.js";

export const findExistingUser = async (email: string): Promise<IUser | null > => {
  try {
    const existingUser = await User.findOne({ email });
    return existingUser;
  } catch (error) {
    console.error(`Error occurred while searching for existing user ${error}`);
    return null;
  }
};

export const createUser = async (
  name : string,
  username : string,
  email : string,
  password : string
): Promise< IUser | null > => {
  try {
    const newUser = new User({ name, username, email, password });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error(`Something went wrong while creating the user ${error}`);
    return null;
  }
};
