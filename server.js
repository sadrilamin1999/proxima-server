require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const projectRoutes = require("../backend/routes/projectRoute");
const userRoutes = require("../backend/routes/userRoute");

// express app
const app = express();

//port
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// routes
app.use("/api/projects", projectRoutes);
app.use("/api/user", userRoutes);

// mongodb
mongoose.set("strictQuery", false); // optional
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log(`connected to mongo & listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
