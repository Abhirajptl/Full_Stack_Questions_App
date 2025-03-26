// import './SinglePost.css';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const SinglePost = () => {
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { postID } = useParams();
//   const navigate = useNavigate();
//   const url = "http://localhost:8000/api/v1";

//   console.log("SinglePost Component - postID:", postID);

//   const loadPost = async () => {
//     try {
//       console.log("Fetching post with postID:", postID);
//       const response = await axios.get(`<span class="math-inline">\{url\}/getsinglepost/</span>{postID}`);
//       console.log("API Response:", response.data);
//       if (response.data.success && response.data.responseData) {
//         setPost(response.data.responseData);
//         setError(null);
//       } else {
//         setError("No matching post found.");
//       }
//     } catch (error) {
//       console.error("Error fetching post:", error);
//       setError("Failed to load post. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadPost();
//   }, [postID]);

//   const handleBack = () => {
//     navigate('/');
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await axios.delete(`${url}/deletepost`, { data: { postID } });
//       if (response.data.success) {
//         alert('Post deleted successfully!');
//         navigate('/');
//       } else {
//         alert('Failed to delete post.');
//         console.error('Delete error:', response.data);
//       }
//     } catch (error) {
//       console.error('Error deleting post:', error);
//       alert('Failed to delete post. Please try again.');
//     }
//   };

//   const handleUpdate = () => {
//     navigate(`/updatepost/${postID}`);
//   };

//   if (loading) return <p>Loading post...</p>;
//   if (error) return <p className="error-message">{error}</p>;
//   if (!post) return <p>No post available.</p>;

//   return (
//     <div className='single-post'>
//       <h1 className='post-topic'>Topic: {post?.topic || "N/A"}</h1>
//       <h2 className='post-question'><strong>Q:</strong> {post?.question || "N/A"}</h2>
//       <p className='post-answer'><strong>A:</strong> {post?.answer || "N/A"}</p>
//       <div className='btns'>
//         <button onClick={handleBack} className='btn btn-back'>Back</button>
//         <button onClick={handleDelete} className='btn btn-delete'>Delete</button>
//         <button onClick={handleUpdate} className='btn btn-update'>Update</button>
//       </div>
//     </div>
//   );
// };

// export default SinglePost;


import './SinglePost.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./SinglePost.css";


const SinglePost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postID } = useParams();
  const navigate = useNavigate();
  const url = "https://full-stack-questions-app.vercel.app/api/v1";

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${url}/getsinglepost/${postID}`);
        if (response.data.success && response.data.responseData) {
          setPost(response.data.responseData);
        } else {
          setError(response.data.message || "Failed to load post.");
        }
      } catch (err) {
        console.error("Error fetching single post:", err);
        setError("Failed to load post. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postID]);

  const handleBack = () => {
    navigate('/');
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await axios.delete(`${url}/deletepost`, { data: { postID } });
        if (response.data.success) {
          alert('Post deleted successfully!');
          navigate('/');
        } else {
          alert(response.data.message || 'Failed to delete post.');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/updatepost/${postID}`);
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!post) return <p>No post available.</p>;

  return (
    <div className='single-post'>
      <h1 className='post-topic'>Topic: {post?.topic || "N/A"}</h1>
      <h2 className='post-question'><strong>Q:</strong> {post?.question || "N/A"}</h2>
      <p className='post-answer'><strong>A:</strong> {post?.answer || "N/A"}</p>
      <div className='btns'>
        <button onClick={handleBack} className='btn btn-back'>Back</button>
        <button onClick={handleDelete} className='btn btn-delete'>Delete</button>
        <button onClick={handleUpdate} className='btn btn-update'>Update</button>
      </div>
    </div>
  );
};

export default SinglePost;