import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
mongoose.connect(URI).
    then(() => {
        console.log("Connected to mongoDB");
    }).catch(error => {

        console.log("Error: ", error.message);
    });


// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
});
// app.post('/contact', (req, res) => {
//     const { name, email, message } = req.body;
//     // Implement email sending logic using a library like Nodemailer
//     // For demonstration purposes, we'll just log the message
//     console.log(`Received message from ${name} (${email}): ${message}`);
//     res.status(200).json({ message: 'Message sent successfully!' });
// });