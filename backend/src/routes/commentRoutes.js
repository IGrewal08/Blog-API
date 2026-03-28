import { Router } from "express";
import commentController from "../controllers/commentController.js";
import verifyToken from "../middleware/authorization.js";

const commentRouter = Router();

commentRouter.get("/:id", commentController.getAllComments); // get comments for a single post (id = post Id)
commentRouter.post("/:id", commentController.postComment); // post a comment onto a post
commentRouter.delete("/:id", verifyToken, commentController.deleteComment); // delete a comment on a post (admin) (id = comment id)

export default commentRouter;