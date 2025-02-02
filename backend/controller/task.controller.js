import User from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Task from "../model/task.model.js";
import Event from "../model/event.model.js";
import Reminder from "../model/reminder.model.js";
import schedule from "node-schedule";

export const Register = async (req, res) => {
    try {
      const { name, email, password } = req.body.userData;
      if (!name || !email || !password) {
        return res.json({ success: false, error: "All fields are required." });
      }
      const isEmailExist = await User.findOne({ email });
      if (isEmailExist) {
        return res.json({ success: false, error: "Email already exists." });
      }
      
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: encryptedPassword });
      await newUser.save();

      return res.json({ success: true, message: "Registration Successful." });
    } catch (error) {
      console.error(error);
      return res.json({ success: false, error });
    }
};

export const Login = async (req, res) => {
    try {
      const { email, password } = req.body?.userData;
      if (!email || !password) {
        return res.json({ success: false, error: "All fields are required." });
      }
      
      const isUserExists = await User.findOne({ email });
      if (!isUserExists) {
        return res.json({ success: false, error: "Email not found." });
      }
      
      const isPasswordCorrect = await bcrypt.compare(password, isUserExists.password);
      if (!isPasswordCorrect) {
        return res.json({ success: false, error: "Incorrect password." });
      }
      
      const token = jwt.sign({ userId: isUserExists._id }, process.env.JWT_SECRET);
      res.cookie("token", token);
      
      return res.json({ success: true, message: "Login successful.", userData: { name: isUserExists.name, email: isUserExists.email, userId: isUserExists._id } });
    } catch (error) {
      console.error(error);
      return res.json({ success: false, error });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.json({ success: false, error: "Unauthorized." });
      
      const data = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(data?.userId);
      if (!user) return res.json({ success: false, error: "User not found." });
      
      return res.json({ success: true, userData: { name: user.name, email: user.email, userId: user._id } });
    } catch (error) {
      console.error(error);
      return res.json({ success: false, error });
    }
};

export const Logout = (req, res) => {
    res.clearCookie("token");
    return res.json({ success: true, message: "Logged out successfully." });
};

export const CreateTask = async (req, res) => {
    try {
      const { title, description, date_time, location, image_url } = req.body;
      if (!title || !description || !date_time || !location || !image_url) {
        return res.json({ success: false, error: "All fields are required." });
      }
      
      const newTask = new Task({ title, description, date_time, location, image_url });
      await newTask.save();
      
      return res.json({ success: true, message: "Task added successfully." });
    } catch (error) {
      console.error(error);
      return res.json({ success: false, error });
    }
};

export const GetAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find({});
      return res.json({ success: true, tasks });
    } catch (error) {
      return res.json({ success: false, error });
    }
};

export const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ success: false, message: "User not found." });
      
      return res.json({ success: true, profile: user });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error." });
    }
};

export const bookTickets = async (req, res) => {
    try {
      const { eventId, ticketCount } = req.body;
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ success: false, message: "Event not found." });
      
      if (event.totalTickets - event.bookedTickets < ticketCount) {
        return res.status(400).json({ success: false, message: "Not enough tickets available." });
      }
      
      event.bookedTickets += ticketCount;
      await event.save();
      
      return res.json({ success: true, message: "Tickets booked successfully." });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error." });
    }
};

export const createReminder = async (req, res) => {
    try {
      const { eventId, reminderTime } = req.body;
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ success: false, message: "Event not found." });
      
      const reminder = new Reminder({ event: eventId, reminderTime });
      await reminder.save();
      
      schedule.scheduleJob(reminderTime, function () {
        console.log("Reminder: Your event is coming up!");
      });
      
      return res.status(201).json({ success: true, message: "Reminder set successfully." });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
};
