import prisma from "../config/prisma.js";

const commentService = {
    getAllComments: async (id) => {
        const postId = parseInt(id, 10);
        if (isNaN(postId)) throw new Error("Invalid Post ID provided");
        return await prisma.comment.findMany({
            where: {
                postId: postId,
            },
        });
    },
    postComment: async (id, body) => {
        const { author, message } = body;
        const postId = parseInt(id, 10);
        if (isNaN(postId)) throw new Error("Invalid Post ID provided");
        return await prisma.comment.create({
            data: {
                author: author,
                message: message,
                postId: postId,
            },
        });
    },
    deleteComment: async (commentId) => {
        const id = parseInt(commentId, 10);
        if (isNaN(id)) throw new Error("Invalid Post ID provided");
        await prisma.comment.delete({
            where: {
                id: id,
            },
        });
    },
}

export default commentService;