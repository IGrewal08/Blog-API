import prisma from "../config/prisma";

export async function getAdmin(email) {
    return await prisma.admin.findUnique({
        where: { email }
    });
}