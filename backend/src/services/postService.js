import prisma from "../config/prisma.js";

const postService = {
    getPostById: async (id) => {
        const postId = parseInt(id, 10);
        if (isNaN(postId)) throw new Error("Invalid Post ID provided");

        return await prisma.post.findUnique({
            where: { 
                id: postId,
            },
            include: {
                comments: true
            },
        });
    },
    getPostsSorted: async (sort) => {
        let order = "desc";
        if (sort == "Old") order = "asc"

        if (sort == "Likes") { 
            return await prisma.post.findMany({
                orderBy: {
                    likes: order,
                },
                include: {
                    _count: {
                        select: { comments: true }
                    }
                }
            });
        } else if (sort == "Comments") { 
            return await prisma.post.findMany({
                orderBy: {
                    comments: {
                        _count: order
                    }
                },
                include: {
                    _count: {
                        select: { comments: true }
                    }
                }
            });
        } else {
            return await prisma.post.findMany({
                orderBy: {
                    createdAt: order,
                },
                include: {
                    _count: {
                        select: { comments: true }
                    }
                }
            });
        }
    },
    postPost: async (body) => {
        const { title, content, published } = body;
        const isPublished = published === "on" || published === true;
        await prisma.post.create({
            data: {
                title: title,
                content: content,
                published: isPublished,
            },
        });
    },
    updatePost: async (id, body) => {
        const { title, content, published } = body;
        const postId = parseInt(id, 10);
        const isPublished = published === "on" || published === true;
        if (isNaN(postId)) throw new Error("Invalid Post ID provided");
        await prisma.post.update({
            where: {
                id: postId 
            },
            data: {
                title: title,
                content: content,
                published: isPublished,
            },
        });
    },
    deletePost: async (id) => {
        const postId = parseInt(id, 10);
        if (isNaN(postId)) throw new Error("Invalid Post ID provided");
        await prisma.post.delete({
            where : {
                id: postId,
            },
        });
    },
}

export default postService;