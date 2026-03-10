const express = require("express");
const cors = require("cors");


require("dotenv").config();
require("./database");

const app = express();

const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const userRoutes = require("./routes/userRoutes");


app.use(cors());
app.use(express.json());


app.use("/students", studentRoutes);
app.use("/courses",courseRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/grades", gradeRoutes);
app.use("/teachers",teacherRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error"
  });
});
