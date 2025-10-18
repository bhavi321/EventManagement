const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
// import userRoutes from "./routes/userRoutes.js";
// import eventRoutes from "./routes/eventRoutes.js";
const routes = require("./routes/routes.js");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", routes);
// app.use("/api/users", userRoutes);
// app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
