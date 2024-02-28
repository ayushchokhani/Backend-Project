import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        // 2 objects as coverImage, avatar
        // name has to be same in frontend field too
        {
            name: "avatar", 
            maxCount: 1, // no of files we are taking
        }, 
        {
            name: "coverImage",
            maxCount: 1,
        }
    ]),
    registerUser
)

export default router;
