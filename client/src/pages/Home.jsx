import { useEffect, useState } from 'react';
import api from '../api/axios';
import PostCard from '../components/PostCard';
import Hero from "../components/Hero";

function Home() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const fetchPosts = async (searchTerm = "") => {
        try {
            const response = await api.get("/posts", {
                params: {
                    search: searchTerm
                }
            });

            setPosts(response.data);

        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);
    const handleSearch = (e) => {
        e.preventDefault();
        fetchPosts(search);
    };
    return (
        <div className='home'>
            <Hero />

            <form onSubmit={handleSearch} className="post-search">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button type="submit">
                    Search
                </button>

                {search && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            fetchPosts("");
                        }}
                    >
                        Clear
                    </button>
                )}

            </form>

            <h1>Latest Posts</h1>

            <div className="post-container">
                {posts.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    posts.map(post => (
                        <PostCard
                            key={post._id}
                            post={post}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default Home;