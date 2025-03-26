import mongoose, { mongo } from "mongoose";

const PostSchema = mongoose.Schema({
    topic: {
        type: String,
        required: [true, "heading is required"],
    },
    question: {
        type: String,
        required: [true, "Question is required"],
    },
    answer: {
        type: String,
        required: [true, "Answer is required"],
    }
})

const PostModal = mongoose.model('QuestionPost', PostSchema);
export default PostModal;