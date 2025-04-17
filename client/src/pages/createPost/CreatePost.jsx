import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './CreatePost.css'; // Assuming you have a CSS file

const CreatePost = () => {
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { postID } = useParams(); // Get the postID from the URL if it exists
  const url = "http://localhost:8000/api/v1";

  useEffect(() => {
    // Fetch post data if postID exists (i.e., it's an update)
    const fetchPostData = async () => {
      if (postID) {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get(`${url}/getsinglepost/${postID}`);
          if (response.data.success && response.data.responseData) {
            setTopic(response.data.responseData.topic);
            setQuestion(response.data.responseData.question);
            setAnswer(response.data.responseData.answer);
          } else {
            setError(response.data.message || 'Failed to load post for update.');
          }
        } catch (err) {
          console.error('Error fetching post for update:', err);
          setError('Failed to load post for update.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPostData();
  }, [postID, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const postData = {
      topic,
      question,
      answer,
    };

    try {
      let response;
      if (postID) {
        // Update existing post
        response = await axios.put(`${url}/updatepost`, { postID, ...postData });
      } else {
        // Create new post
        response = await axios.post(`${url}/createpost`, postData);
      }

      if (response.data.success) {
        alert(postID ? 'Post updated successfully!' : 'Post created successfully!');
        navigate('/');
      } else {
        setError(response.data.message || (postID ? 'Failed to update post.' : 'Failed to create post.'));
      }
    } catch (err) {
      console.error('Error submitting post:', err);
      setError(postID ? 'Failed to update post. Please try again.' : 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="create-post-container">
      <h1>{postID ? 'Update Post' : 'Create New Post'}</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Answer:</label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (postID ? 'Save Changes' : 'Create Post')}
          </button>
          <button type="button" onClick={handleCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;