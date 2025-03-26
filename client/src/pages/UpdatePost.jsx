import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdatePost = () => {
    const { postID } = useParams();
    const navigate = useNavigate();
    const url = "http://localhost:8000/api/v1";

    // State for storing post details
    const [post, setPost] = useState({
        topic: '',
        question: '',
        answer: ''
    });

    // Load post details
    const loadPostDetails = async () => {
        try {
            const response = await axios.get(`${url}/getsinglepost?postID=${postID}`);
            setPost(response?.data?.responseData);
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    // Update post function
    const updatePost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${url}/updatepost`, {
                postID,
                topic: post.topic,
                question: post.question,
                answer: post.answer
            });

            if (response.data.success) {
                alert("Post Updated Successfully!");
                navigate(`/post/${postID}`); // Redirect to updated post
            }
        } catch (error) {
            console.error("Error updating post:", error);
            alert("Failed to update post. Check console for details.");
        }
    };

    useEffect(() => {
        loadPostDetails();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="update-post-container">
            <h2>Update Post</h2>
            <form onSubmit={updatePost}>
                <div>
                    <label>Topic:</label>
                    <input
                        type="text"
                        name="topic"
                        value={post.topic}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Question:</label>
                    <input
                        type="text"
                        name="question"
                        value={post.question}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Answer:</label>
                    <textarea
                        name="answer"
                        value={post.answer}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Update</button>
                <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
};

export default UpdatePost;

