import Post from "../model/postModel";
import { Request, Response } from "express";
import baseController from "./baseController";

const postController = new baseController(Post);

export default postController;
