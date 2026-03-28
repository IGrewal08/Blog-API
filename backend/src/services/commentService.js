import prisma from "../config/prisma.js";

const commentService = {
    getAllComments: async (id) => {
        return await prisma.comment.findMany({
            where: {
                postId: id,
            },
        });
    },
    postComment: async (id, body) => {
        const { author, message } = body;
        await prisma.comment.create({
            data: {
                author: author,
                message: message,
                postId: id,
            },
        });
    },
    deleteComment: async (id) => {
        await prisma.comment.delete({
            where: {
                id: id,
            },
        });
    },
}

export default commentService;