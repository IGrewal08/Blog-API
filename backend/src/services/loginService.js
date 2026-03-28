import prisma from "../config/prisma.js";

export default async function getAdmin(email) {
    return await prisma.admin.findUnique({
        where: { email }
    });
}