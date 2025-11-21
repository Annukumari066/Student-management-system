const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Student = require('./models/Student');

const app = express();
app.use(cors());
app.use(express.json());

// ------------------- MongoDB Connection -------------------
mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ------------------- ROUTES -------------------

// GET all students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

// POST add new student
app.post("/students", async (req, res) => {
    try {
        const { name, course, age, city } = req.body;

        if (!name || !course || !age || !city) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newStudent = new Student({ name, course, age, city });
        await newStudent.save();

        res.status(201).json({ message: "Student added successfully", newStudent });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

// PUT update student
app.put("/students/:id", async (req, res) => {
    try {
        const updatedData = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({ message: "Student updated", updatedStudent });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

// DELETE student
app.delete("/students/:id", async (req, res) => {
    try {
        const deleted = await Student.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

// ------------------- Start Server -------------------
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
