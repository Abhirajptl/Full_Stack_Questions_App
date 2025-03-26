// import { useEffect, useState } from "react";

// const Home = () => {
//   const [posts, setPosts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch posts from backend
//   useEffect(() => {
//     fetch("http://localhost:5000/api/getposts") // Ensure correct endpoint
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched Posts:", data); // Debugging log
//         setPosts(data);
//       })
//       .catch((err) => console.error("Error fetching posts:", err));
//   }, []);

//   // Filter posts based on search term
//   const filteredPosts = searchTerm
//     ? posts.filter((post) =>
//         post.topic.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : posts; // Show all posts if no search term

//   return (
//     <div>
//       <h1>QuestionBank</h1>

//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search by topic..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {/* Display Posts */}
//       <div>
//         {filteredPosts.length > 0 ? (
//           filteredPosts.map((post) => (
//             <div key={post._id} className="post-card">
//               <h2>{post.topic}</h2>
//               <h3>{post.question}</h3>
//               <p>{post.answer}</p>
//             </div>
//           ))
//         ) : (
//           <p>No matching posts found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;


// import { useEffect, useState, useCallback } from "react";
// import Card from "./Card";
// import "./Home.css";

// const Home = ({ searchQuery }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchPosts = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:8000/api/v1/getposts");
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log("Fetched Posts in Home (useCallback):", data);
//       setPosts(data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching posts in Home (useCallback):", err);
//       setError("Failed to load posts. Please check the backend.");
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]); // Depend on fetchPosts

//   const filteredPosts = posts; // Directly use fetched posts for now

//   if (loading) {
//     return <div>Loading posts...</div>;
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <div className="home-container">
//       {posts.length > 0 ? ( // Use 'posts.length' directly here
//         <div className="posts-grid">
//           {posts.map((post) => ( // Map over 'posts' directly
//             <Card key={post._id} post={post} />
//           ))}
//         </div>
//       ) : (
//         <p>No posts found.</p> // Changed message for clarity
//       )}
//     </div>
//   );
// };

// export default Home;



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
      const response = await fetch("https://full-stack-questions-app.vercel.app/api/v1/getposts");
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