
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    instructor: String
});

export default mongoose.model('Course', courseSchema);