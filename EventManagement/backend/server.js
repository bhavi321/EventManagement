const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.js");
// import userRoutes from "./routes/userRoutes.js";
// import eventRoutes from "./routes/eventRoutes.js";
const routes = require("./src/routes/routes.js");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Event Management API is running", status: "ok" });
});

app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
