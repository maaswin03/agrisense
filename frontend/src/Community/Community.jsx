import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../Community/Community.css'

const CommunityPage = () => {
    const [posts, setPosts] = useState([]);

    const handleNewPost = (newPost) => {
        setPosts([...posts, newPost]);
    };

    return (
        <div>
            <Navbar />
            <div className='community1'>
                <h1>Community Page</h1>
                <PostForm onNewPost={handleNewPost} />
                <PostList posts={posts} />
            </div>
            <Footer />
        </div>
    );
};

const PostForm = ({ onNewPost }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        const newPost = { content, author: 'User' };
        onNewPost(newPost);
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} /><br></br>
            <button type="submit">Post</button>
        </form>
    );
};

const PostList = ({ posts }) => {
    return (
        <ul>
            {posts.map((post, index) => (
                <PostItem key={index} post={post} />
            ))}
        </ul>
    );
};

const PostItem = ({ post }) => {
    return (
        <div className='community2'>
            <li>
                <p>{post.content}</p>
                <p>by : {post.author}</p>
            </li>
        </div>
    );
};

export default CommunityPage;
