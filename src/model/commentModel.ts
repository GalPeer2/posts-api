import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  writerId: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("comment", commentSchema);
