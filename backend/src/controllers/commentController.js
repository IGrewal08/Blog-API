import { body, query, validationResult } from "express-validator";
import commentService from "../services/commentService";

const commentController = {
    getAllComments: async (req, res) => {
        try {
            const { id } = req.params;
            const comments = await commentService.getAllComments(id);
            if (!comments) return res.status(404).json({ message: "Page not found! "});
            res.status(200).json(comments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching comments! "});
        }
    },
    postComment: async (req, res) => {
        try {
            const { id } = req.params;
            await commentService.postComment(id, req.body);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching comments! "});
        }
    },
    deleteComment: async (req, res) => {
        try {
            const { id } = req.params;
            await commentService.deleteComment(id);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching comments! "});
        }
    },
}

export default commentController;