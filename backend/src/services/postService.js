import prisma from "../config/prisma";

export const postService = {
    getPostById: async (id) => {
        return await prisma.post.findUnique({
            where: { 
                id: parseInt(id), 
                published: true 
            },
            include: {
                comment: true
            },
        });
    },
    getPostsSorted: async (sort) => {
        order = "desc";
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
            return await prisma.port.findMany({
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
        await prisma.post.create({
            data: {
                title: title,
                content: content,
                published: published,
            },
        });
    },
    updatePost: async (id, body) => {
        const { title, content, published } = body;
        await prisma.post.update({
            where: {
                id: id 
            },
            data: { 
                title: title,
                content: content,
                published: published,
            },
        });
    },
    deletePost: async (id) => {
        await prisma.post.delete({
            where : {
                id: id,
            },
        });
    },
}