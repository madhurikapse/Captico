import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../axiosconfig";
import toast from "react-hot-toast";
import "../style/CreateEvent.css"
function CreateEvent() {
    const navigate = useNavigate();
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        date_time: '',
        location: '',
        image_url: '',
    });
    const [errors, setErrors] = useState([]);
    const [disable, setDisable] = useState(true);
    const [users, setUsers] = useState([]);
    console.log(taskData, "taskData");

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await Api.get("/getall"); // Fetch all users
                if (response.data.success) {
                    setUsers(response.data.users);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        fetchUsers();
    }, []);

    function handleChange(event) {
        setTaskData({ ...taskData, [event.target.name]: event.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (taskData.title && taskData.description && taskData.date_time && taskData.location && taskData.image_url) {
                const response = await Api.post("/CreateTask", taskData); // Send taskData directly
                if (response.data.success) {
                    setTaskData({
                        title: '',
                        description: '',
                        date_time: '',
                        location: '',
                        image_url: '',
                    });
                    navigate("/all-tasks");
                    toast.success(response.data.message);
                }
            } else {
                toast.error("All fields are mandatory.");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "An error occurred");
        }
    }

    useEffect(() => {
        const errorsArray = [];
        if (!taskData.title) errorsArray.push("Title is required.");
        if (!taskData.description) errorsArray.push("Description is required.");
        if (!taskData.date_time) errorsArray.push("Date and time are required.");
        if (!taskData.location) errorsArray.push("Location is required.");
        if (!taskData.image_url) errorsArray.push("Image URL is required.");

        setErrors(errorsArray);
        setDisable(errorsArray.length > 0);
    }, [taskData]);

    return (
        <div id="ar-main">
            <form onSubmit={handleSubmit}>
                <h1>Create Course</h1>
                {errors.length > 0 && (
                    <div className="error-messages">
                        {errors.map((error, index) => (
                            <p key={index} className="error-message">{error}</p>
                        ))}
                    </div>
                )}
                <label>Title:</label><br />
                <input type='text' name='title' onChange={handleChange} value={taskData.title} /><br />
                <label>Description:</label><br />
                <textarea name='description' onChange={handleChange} value={taskData.description}></textarea><br />
                <label>Date and Time:</label><br />
                <input type="datetime-local" name="date_time" value={taskData.date_time} onChange={handleChange} /><br />
                <label>Image URL:</label><br />
                <input type="text" name="image_url" value={taskData.image_url} onChange={handleChange}></input><br />
                <label>Location:</label><br />
                <select name="location" value={taskData.location} onChange={handleChange}>
                    <option value="">Select Location</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                </select><br /><br />
                <input type='submit' value="Create Event" disabled={disable} />
            </form>
        </div>
    );
}

export default CreateEvent;