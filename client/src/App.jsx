import './App.css';
import { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import CreatePost from './pages/createPost/CreatePost';
import Home from './pages/home/Home';
import { Routes, Route } from 'react-router-dom';
import SinglePost from './pages/singlePost/SinglePost';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      <Routes>
        <Route path='/' element={<Home searchQuery={searchQuery} />} />
        <Route path='/createpost' element={<CreatePost />} />
        <Route path='/updatepost/:postID' element={<CreatePost />} />
        <Route path='/:postID' element={<SinglePost />} /> {/* THIS IS THE IMPORTANT ROUTE */}
      </Routes>
    </>
  );
}

export default App;