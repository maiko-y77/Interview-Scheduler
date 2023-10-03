const { PrismaClient } = require("@prisma/client")

const client = new PrismaClient()


const resetDB = async () => {
    await client.day.deleteMany()
    const days = await client.day.createMany({
        data: [
            { name: "Monday" },
            { name: "Tuesday" },
            { name: "Wednesday" },
            { name: "Thursday" },
            { name: "Friday" }
        ]
    })



}

resetDB().catch((err) => {
    console.log(`something went wrong while seeding!!, ${err}`)
})