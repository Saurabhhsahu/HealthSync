import express from "express";
import { getUserDetail,signup,storeUserDetail } from "../controllers/profileController.js";

const userRouter = express.Router();

// Route to get user details
userRouter.post("/getUserDetail", getUserDetail);
userRouter.post("/storeUserDetail", storeUserDetail);
userRouter.post("/signup", signup);

export default userRouter;
