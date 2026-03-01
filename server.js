const express = require("express");
const cors = require("cors");

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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});