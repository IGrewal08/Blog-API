import { Router } from "express";
import postController from "../controllers/postController";

const postRouter = Router();

postRouter.get("/:id", postController.getPost); // get a specific post
postRouter.get("/sort/", postController.getAllPosts); // get posts by some filter
postRouter.post("/", postController.postNewPost); // create a new post
postRouter.put("/:id", postController.updatePost); // edit a post
postRouter.delete("/:id", postController.deletePost); // delete a post

export default postRouter;