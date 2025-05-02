const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const chatbotConfigRoutes = require('./routes/chatbotConfigRoutes');
const signupRoutes = require('./routes/signupRoutes');
const addTeamMemberRoutes = require("./routes/addTeamMemberRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes")
const allTickets = require("./routes/allTickets")
const messageRoutes = require("./routes/messageRoutes");
const loginRoutes = require("./routes/loginRoutes");
const ticketRoutes = require("./routes/ticketRoutes")
const allUsers = require("./routes/allUsers")
const teamRoutes = require("./routes/teamRoutes")
const analytics = require('./routes/analytics');
const userDetails = require("./routes/userDetails")

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


// mongoose.connect("mongodb+srv://shubhamupadhyay8299:VjPL37yacwx8LaEz@cluster0.vfrrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("MongoDB connected"))
//     .catch((err) => console.log(err))

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })

app.use('/api/config', chatbotConfigRoutes);
app.use("/api", signupRoutes);
app.use("/api", addTeamMemberRoutes);
app.use("/api", chatbotRoutes);
app.use("/api", allTickets);
app.use("/api", loginRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api", allUsers);
app.use("/api", teamRoutes);
app.use('/api', analytics);
app.use('/api/user', userDetails);
// app.use('/api/user', userDetails);