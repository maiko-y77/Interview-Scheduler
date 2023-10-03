const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllDays() {
    return await prisma.day.findMany();
}

module.exports = {
    getAllDays,
};
