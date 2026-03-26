import { Router } from "express";
import commentController from "../controllers/commentController";
import verifyToken from "../middleware/authorization";

const commentRouter = Router();

commentRouter.get("/id", commentController.getAllComments); // get comments for a single post (id = post Id)
commentRouter.post("/", commentController.postComment); // post a comment onto a post
commentRouter.delete("/:id", verifyToken, commentController.deleteComment); // delete a comment on a post (admin) (id = comment id)

export default commentRouter;