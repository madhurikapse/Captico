import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../axiosconfig";
import { AuthContext } from "../context/auth.context";
import "../style/Tasklist.css";

function Tasklist() {
    const { state } = useContext(AuthContext);
    const navigate = useNavigate();
    const [allTasks, setAllTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: "",
        description: "",
        date_time: "",
        location: "",
        image_url: ""
    });

    const [users, setUsers] = useState([]);

    // Fetch all users
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await Api.get("/getall");
                if (response.data.success) {
                    setUsers(response.data.users);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers();
    }, []);

    // Fetch tasks
    async function GetTask() {
        setLoading(true);
        try {
            const response = await Api.post("/your-added-tasks", { userId: state?.user?.userId });
            if (response.data.success) {
                setLoading(false);
                setAllTasks(response.data.tasks);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        GetTask();
    }, []);

    async function handleUpdate() {
        if (!editFormData.title || !editFormData.description || !editFormData.date_time || !editFormData.location || !editFormData.image_url) {
            alert("All fields are required.");
            return;
        }

        try {
            const response = await Api.put(`/task/update/${taskToEdit}`, { taskData: editFormData });

            if (response.data.success) {
                setTimeout(() => {
                    GetTask();
                }, 500);

                setTaskToEdit(null);
                setEditFormData({
                    title: "",
                    description: "",
                    date_time: "",
                    location: "",
                    image_url: ""
                });
            } else {
                console.error("Update failed:", response.data.error);
            }
        } catch (error) {
            console.error("Error updating task:", error.response?.data || error.message);
        }
    }

    function handleEdit(task) {
        setTaskToEdit(task._id);
        setEditFormData({
            title: task.title,
            description: task.description,
            date_time: task.date_time,
            location: task.location,
            image_url: task.image_url
        });
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setEditFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleDelete(taskId) {
        try {
            const response = await Api.delete(`/task/delete/${taskId}`);
            if (response.data.success) {
                GetTask();
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    return (
        <div id="main">
            <h1>All Course</h1>
            {loading ? (
                <h1>Loading....</h1>
            ) : (
                <div id="alltasksshow">
                    {allTasks.map((task) => (
                        <div id="taskshow" key={task._id}>
                            <p><b>Title</b>: {task.title}</p>
                            <p><b>Description</b>: {task.description}</p>
                            <p><b>Date</b>: {task.date_time}</p>
                            <p><b>Location</b>: {task.location}</p>
                            <p><b>Image:</b></p>
                            {task.image_url ? (
                                <img 
                                    src={task.image_url} 
                                    alt={task.title} 
                                    style={{ width: "200px", height: "150px", objectFit: "cover" }} 
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            ) : (
                                <p>No Image Available</p>
                            )}
                            <button onClick={() => handleEdit(task)}>Edit</button>
                            <button onClick={() => handleDelete(task._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}

            {taskToEdit && (
                <div id="editForm">
                    <h2>Edit Course</h2>
                    <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                    />
                    <textarea
                        name="description"
                        value={editFormData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                    />
                    <input
                        type="date"
                        name="date_time"
                        value={editFormData.date_time}
                        onChange={handleInputChange}
                    />
                    <select
                        name="location"
                        value={editFormData.location}
                        onChange={handleInputChange}
                    >
                        <option value="">Select location</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="pune">Pune</option>
                    </select>
                    <input
                        type="text"
                        name="image_url"
                        value={editFormData.image_url}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                    />
                    {editFormData.image_url && (
                        <img 
                            src={editFormData.image_url} 
                            alt="Preview" 
                            style={{ width: "200px", height: "150px", objectFit: "cover" }} 
                        />
                    )}
                    <button onClick={handleUpdate}>Update Task</button>
                    <button onClick={() => setTaskToEdit(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Tasklist;
