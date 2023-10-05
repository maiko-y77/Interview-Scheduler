const express = require("express");
const app = express();
const port = 8000;
const dayRoutes = require("./routes/dayRoutes"); // import day router
const cors = require('cors');
const { client } = require("./prisma");

app.use(cors())
app.use(express.json());

app.use("/", dayRoutes);

app.get("/api/days/:day/interviewers", async (req, res) => {
    const { day } = req.params

    const availableInterviewer = await client.availableInterviewer.findMany({
        where: { day: { name: day } },
        include: {
            interviewer: true
        }
    })

    const interviewers = availableInterviewer.map(interviewer => interviewer.interviewer)
    res.send(interviewers)
})

app.listen(port, () => console.log(`Server is running on port ${port}`));
