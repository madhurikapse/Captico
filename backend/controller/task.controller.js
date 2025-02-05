import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Task from "../model/task.model.js";

export const Register = async (req, res) => {
    try {
      const { name, email, password } = req.body.userData;
      if (!name || !email || !password) {
        return res.json({ success: false, error: "All fields are required." });
      }
      const isEmailExist = await User.findOne({ email: email });
      console.log(isEmailExist, "isEmailExist");
      if (isEmailExist) {
        return res.json({
          success: false,
          error: "Email is exists, please use another one.",
        });
      }
  
      const encryptedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name: name,
        email: email,
        password: encryptedPassword,
      });
  
      const responseFromDb = await newUser.save();
  
      return res.json({
        success: true,
        message: "Registeration Successfull.",
      });
    } catch (error) {
      console.log(error, "error");
      return res.json({ error: error, success: false });
    }
  };

  export const Login = async (req, res) => {
    try {
      const { email, password } = req.body?.userData;
      if (!email || !password) {
        return res.json({ success: false, error: "All fields are required." });
      }
  
      const isUserExists = await User.findOne({ email: email });
      if (!isUserExists) {
        return res.json({ success: false, error: "Email not found." });
      }
  
      const isPasswordCorrect = await bcrypt.compare(
        password,
        isUserExists.password
      );
      console.log(isPasswordCorrect, "isPasswordCorrect");
      if (!isPasswordCorrect) {
        return res.json({ success: false, error: "Password is wrong." });
      }
      const userData = {
        name: isUserExists.name,
        email: isUserExists.email,
        userId : isUserExists._id
      };
  
      const token = await jwt.sign(
        { userId: isUserExists._id },
        process.env.JWT_SECRET
      );
  
      res.cookie("token", token);
      return res.json({
        success: true,
        message: "Login successfull.",
        userData,
      });
    } catch (error) {
      return res.json({ success: falsse, error: error });
    }
  };

  export const getCurrentUser = async (req, res) => {
    try {
      const token = req.cookies.token;
      const data = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(data, "data");
      const user = await User1.findById(data?.userId);
        if (!user) {
          return res.json({ success: false });
        }
        const userData = {
          name: user.name,
          email: user.email,
          userId: user._id,
        };
        return res.json({ success: true, userData });
    } catch (error) {
      return res.json({ success: false, error });
    }
  };

  export const Logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ success: true, message: "Logged out successfully." });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

  export const CreateTask = async (req, res) => {
    try {
      const {title, description, date_time,location,image_url } = req.body;
      if (!title || !description || !date_time || !location || !image_url ) {
        return res.json({ success: false, error: "All fields are required." });
      }
      const isTitleExist = await Task.findOne({ title});
      console.log(isTitleExist, "isTitleExist");
      if (isTitleExist) {
        return res.json({
          success: false,
          error: "Title is exists, please use another one.",
        });
      }
  
      const newTask = new Task({
        title: title,
        description: description,
        date_time:date_time,
        location:location,
        image_url:image_url
      });
  
      const responseFromDb = await newTask.save();
  
      return res.json({
        success: true,
        message: "Task added Successfully.",
      });
    } catch (error) {
      console.log(error, "error");
      return res.json({ error: error, success: false });
    }
  };
  export const TicketBook = async (req, res) => {
    try {
      const {ticket} = req.body;
      if (!ticket) {
        return res.json({ success: false, error: "All fields are required." });
      }
      
  
      const newTicket = new Ticket({
        ticket: ticket,
        
      });
  
      const responseFromDb = await newTicket.save();
  
      return res.json({
        success: true,
        message: "Ticket added Successfully.",
      });
    } catch (error) {
      console.log(error, "error");
      return res.json({ error: error, success: false });
    }
  };

  export const GetAllTasks = async (req,res) =>{
    try {
      const tasks = await Task.find({});
      res.json({ success: true, tasks });
    } catch (error) {
      return res.json({ error, success: false });
    }
  };

  export const UpdateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date_time, loaction, image_url} = req.body.taskData;

        if (!title || !description || !date_time || !image_url || !loaction) {
            return res.json({ success: false, error: "All fields are required." });
        }

        const updatedTask = await Task.findByIdAndUpdate(id, {
            title, description,date_time, loaction, image_url
        }, { new: true });

        if (!updatedTask) {
            return res.json({ success: false, error: "Task not found." });
        }

        return res.json({ success: true, message: "Task updated successfully.", task: updatedTask });
    } catch (error) {
        console.log(error, "error");
        return res.json({ success: false, error });
    }
};


export const DeleteTask = async (req, res) => {
  try {
      const { id } = req.params;

      const deletedTask = await Task.findByIdAndDelete(id);

      if (!deletedTask) {
          return res.json({ success: false, error: "Task not found." });
      }

      return res.json({ success: true, message: "Task deleted successfully." });
  } catch (error) {
      console.log(error, "error");
      return res.json({ success: false, error });
  }
};

export const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({ success: true, users });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

export const YourAddedTasks = async (req, res) => {
  try {
    const { userId } = req.body;
    const tasks = await Task.find({ loaction: userId });
    console.log(userId)
    return res.json({ success: true, tasks });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error, success: false });
  }
};
export const getUserProfile = async (req, res) => {
  try {
      const profile = await profile.findById(req.user._id);
      if (!profile) return res.status(404).json({ message: 'User not found' });
      res.json({profile});
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
};


 export const  getUserBookings = async (req, res) => {
  try {
      const event = await event.find({ 'bookings.user': req.user._id });
      res.json({ bookings: event});
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
};


 export const bookTickets = async (req, res) => {
  const { eventId, ticketCount } = req.body;
  try {
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      if (event.totalTickets - event.bookedTickets < ticketCount) return res.status(400).json({ message: 'Not enough tickets available' });

      event.bookedTickets += ticketCount;
      await event.save();
      res.json({ message: 'Tickets booked successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
};

export const createReminder = async (req, res) => {
  try {
      const { eventId, reminderTime } = req.body;
      const event = await Event.findById(eventId);
      if (!event) {
          return res.status(404).json({ success: false, message: 'Event not found' });
      }

      const reminder = new Reminder({ event: eventId, reminderTime });
      await reminder.save();

      
      scheduleReminder(reminderTime, event);

      res.status(201).json({ success: true, message: 'Reminder set successfully' });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
};








  