const express = require("express");
const app = express();
const port = 8000;
const dayRoutes = require("./routes/dayRoutes"); // import day router
const cors = require("cors");
const { client } = require("./prisma");

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log(`a client is connected, ${socket.id}`);
    socket.on("updatedAppointments", (appointments) => {
        socket.broadcast.emit("updatedAppointments", appointments);
    });

    socket.on("disconnection", () => {
        console.log(`a client is disconnected, ${socket}`);
    });
});

app.use(cors());
app.use(express.json());

app.use("/", dayRoutes);

app.get("/api/days/:day/interviewers", async (req, res) => {
    const { day } = req.params;

    const availableInterviewer = await client.availableInterviewer.findMany({
        where: { day: { name: day } },
        include: {
            interviewer: true
        }
    });

    const interviewers = availableInterviewer.map(
        (interviewer) => interviewer.interviewer
    );
    res.send(interviewers);
});

app.get("/api/days/:day/appointments", async (req, res) => {
    const { day } = req.params;

    const appointments = await client.appointment.findMany({
        where: { day: { name: day } },
        include: { interview: { include: { interviewer: true } } },
        orderBy: { id: "asc" }
    });
    res.send(appointments);
});

// Define an endpoint to handle interview upsert (create or update)

app.put("/api/appointments/:id/interviews", async (req, res) => {
    const { id } = req.params;
    const appointment_id = parseInt(id);

    const { student, interviewer_id } = req.body;
    if (!student || !interviewer_id || !appointment_id) {
        throw new Error(`Something went wrong need to be fixed!!!!!!!`);
    }

    try {
        await client.interview.upsert({
            create: { student, appointment_id, interviewer_id },
            update: { student, appointment_id, interviewer_id },
            where: {
                appointment_id
            }
        });
    } catch (err) {
        throw new Error(`something went wrong!! while upserting!!`);
    }
    res.send({ message: "Successfully create or updated!!" });
});

app.delete("/api/interviews/:interviewId", async (req, res) => {
    const { interviewId } = req.params;

    try {
        await client.interview.delete({
            where: { id: parseInt(interviewId) }
        });

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting interview:", error);
        res.status(500).send("Something went wrong. Please try again.");
    }
});

server.listen(port, () => console.log(`Server is running on port ${port}`));