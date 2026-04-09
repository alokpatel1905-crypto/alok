"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const users = await prisma.user.count();
    const institutions = await prisma.institution.count();
    const programs = await prisma.program.count();
    const events = await prisma.event.count();
    const rankings = await prisma.ranking.count();
    console.log({
        users,
        institutions,
        programs,
        events,
        rankings,
    });
    if (programs > 0) {
        const latestPrograms = await prisma.program.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
        });
        console.log('Latest Programs:', latestPrograms);
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=check-db.js.map