const express = require("express");
const cors = require("cors");
const attendanceRoutes = require("./routes/attendanceRoute");
const authRoutes = require("./routes/authRoute");
const departmentRoutes = require("./routes/departmentRoute");
const employeeRoutes = require("./routes/employeeRoute");
const holidayRoutes = require("./routes/holidayRoute");
const leaveRoutes = require("./routes/leaveRoute");
const typeRoutes = require("./routes/typeRoute");
const userRoutes = require("./routes/userRoute");
const workdayRoutes = require("./routes/workdayRoute");


const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use('/attendance', attendanceRoutes);
app.use('/auth', authRoutes);
app.use('/department', departmentRoutes);
app.use('/employee', employeeRoutes);
app.use('/holiday', holidayRoutes);
app.use('/leave', leaveRoutes);
app.use('/type', typeRoutes);
app.use('/user', userRoutes);
app.use('/workday', workdayRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
