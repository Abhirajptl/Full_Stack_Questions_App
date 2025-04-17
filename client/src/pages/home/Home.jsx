import { useEffect, useState, useCallback } from "react";
import Card from "./Card";
import "./Home.css";

const Home = ({ searchQuery }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/v1/getposts");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched Posts in Home (useCallback):", data);
      setPosts(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching posts in Home (useCallback):", err);
      setError("Failed to load posts. Please check the backend.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = searchQuery
    ? posts.filter((post) =>
        post.topic && post.topic.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-container">
      {filteredPosts.length > 0 ? (
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <Card key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p>No matching posts found.</p>
      )}
    </div>
  );
};

export default Home;