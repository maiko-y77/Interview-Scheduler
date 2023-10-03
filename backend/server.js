const express = require("express");
const app = express();
const port = 8000;
const dayRoutes = require("./routes/dayRoutes"); // import day router
const cors = require('cors')

app.use(cors())
app.use(express.json());

app.use("/", dayRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
