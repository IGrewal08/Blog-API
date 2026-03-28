import { body, query, validationResult } from "express-validator";
import postService from "../services/postService.js";

const postController = {
    getPost: async (req, res) => {
        try {
            const { id } = req.params;
            const post = await postService.getPostById(id);

            if (!post) return res.status(404).json({ message: "Page not found! "});
            res.status(200).json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching post! "});
        }
    },
    // attach JWT if one exists (show all posts) else only show unhidden posts
    getAllPosts: async (req, res) => {
        try {
            const { sort } = req.query;
            const posts = await postService.getPostsSorted(sort);
            if (!posts) return res.status(404).json({ message: "Page not found! "});
            console.log(posts);
            res.status(200).json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching post! "});
        }
    },
    postNewPost: async (req, res) => {
        try {
            await postService.postPost(req.body);
            res.status(202);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching post! "});
        }
    },
    updatePost: async (req, res) => {
        try {
            const { id } = req.params;
            await postService.updatePost(id, req.body);
            res.status(202);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching post! "});
        }
    },
    deletePost: async (req, res) => {
        try {
            const { id } = req.params;
            await postService.deletePost(id);
            res.status(202);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching post! "});
        }
    },
}

export default postController;