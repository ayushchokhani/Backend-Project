import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists- username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object- create entry in MongoDb
  // remove password and refresh tokens from response
  // check if user successfully created or not
  // return response

  const { username, email, fullname, password } = req.body;
  console.log("username", username);

  // this mtd can be used fro all fields but it is repetitive task
  // if(username === "") {
  //     throw new ApiError(400, "Username is required");
  // }

  // if any element from array even after trimming is empty return true
  if (
    [username, email, fullname, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //findOne returns first user who matches the query
  //   User.findOne({username}) --> also correct

  // now it will return first user whose email or username matches
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with same email or username already exists");
  }

  // multer gives access to req.files
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // we require 1st object of avatar and then its path

  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "", //checking if coverImage exists
    username: username.toLowerCase(),
    email,
    password,
  });

  // checking if user successfully created or not
  //MongoDB add _id to every entry
  const createdUser = await User.findById(user._id)?.select(
    "-password -refreshToken" //hiding entered fields
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while regestring the user");
  }

  return res.status(200).json(new ApiResponse(201, createdUser, "User Registered Successfully"));
});

export { registerUser };
