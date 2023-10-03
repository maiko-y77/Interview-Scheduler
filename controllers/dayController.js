const { client } = require('../prisma/index');

async function getAllDaysWithAppointments(req, res) {
    try {
        //  Get all days and quantity of appointments available
        const days = await client.day.findMany({
            include: {
                Appointments: {
                    include: {
                        interview: true
                    }
                }
            }
        });

        const mappedDays = days.map((day) => ({
            id: day.id,
            name: day.name,
            spots: day.Appointments.reduce(
                (count, curr) => (curr.interview ? count - 1 : count),
                5
            )
        }));

        res.json(mappedDays);
    } catch (error) {
        console.error('Error fetching Day data with appointments count', error);
        res.status(500).json({ error: 'Error fetching Day data with appointments count' });
    }
}

module.exports = {
    getAllDaysWithAppointments,
};

