import PostModal from '../models/post.model.js'

const CreatePost = async (req, res, next) => {
    try {
        const { topic, question, answer } = req.body;
        console.log(topic, question, answer);
        const responseData = await PostModal.create({
            topic,
            question,
            answer,
        })
        res.send({
            success: true,
            responseData,
        })
    } catch (error) {
        console.error("Error :: createPost :: \n" + error)
    }
}

const getPosts = async (req, res) => {
    try {
      const posts = await PostModal.find(); // Fetch all posts from MongoDB
      console.log("Fetched posts from DB:", posts); // Log the data from the database
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Error fetching posts", error });
    }
  };

  const getSinglePost = async (req, res) => {
    try {
        const { postID } = req.params;
        console.log("Received postID in getSinglePost:", postID);

        if (!postID) {
            return res.status(400).json({ success: false, message: "Missing postID" });
        }

        console.log("Attempting to find post with ID:", postID);

        const post = await PostModal.findById(postID); // <---- CORRECTED LINE: Using PostModal
        console.log("Post found:", post);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.json({ success: true, responseData: post });
    } catch (error) {
        console.error("Error fetching single post:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

  const deletePost = async (req, res, next) => {
    try {
        const { postID } = req.body;
        if(!postID) return res.status(400).json({ success: false, message: "Please Provide post id" });
        const responseData = await PostModal.findByIdAndDelete(postID);
        if (!responseData) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        res.json({
            success: true,
            responseData,
        });
    } catch (error) {
        console.error("Error :: deletePost :: \n" + error);
        res.status(500).json({ success: false, message: "Error deleting post", error: error.message });
    }
}


const updatePost = async (req, res, next) => {
    try {
        const { postID, topic, question, answer } = req.body;
        if (!postID) return res.status(400).json({ success: false, message: "Post ID is required" });

        console.log("Updating post:", postID, topic, question, answer); // Debugging

        const updatedPost = await PostModal.findByIdAndUpdate(
            postID,
            { topic, question, answer },
            { new: true } // Returns updated data
        );

        if (!updatedPost) return res.status(404).json({ success: false, message: "Post not found" });

        res.json({ success: true, responseData: updatedPost });
    } catch (error) {
        console.error("Error :: updatePost ::", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};




export {
    CreatePost,
    getPosts,
    getSinglePost,
    deletePost,
    updatePost,
}