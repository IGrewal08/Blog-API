import { Router } from "express";
import postController from "../controllers/postController";
import verifyToken from "../middleware/authorization";

const postRouter = Router();

postRouter.get("/:id", postController.getPost); // get a specific post
postRouter.get("/sort", postController.getAllPosts); // get posts by some filter
postRouter.post("/", verifyToken, postController.postNewPost); // create a new post
postRouter.put("/:id", verifyToken, postController.updatePost); // edit a post
postRouter.delete("/:id", verifyToken, postController.deletePost); // delete a post

export default postRouter;