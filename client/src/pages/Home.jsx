import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [sortOrder, setSortOrder] = useState("New");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/posts?sort=${sortOrder}`);
                const json = await response.json();

                setPosts(Array.isArray(json) ? json : (json.rows || []));
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [sortOrder]);

    return (
        <>
            <div>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="New">New</option>
                    <option value="Old">Old</option>
                    <option value="Comments">Most Comments</option>
                    <option value="Likes">Most Liked</option>
                </select>
            </div>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    posts.map((blog) => (
                        <Link key={blog.id} to={`/post/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <PostCard 
                                blog={blog}
                            />
                        </Link>
                    ))
                )}
            </div>
        </>
    );
}

function PostCard({ blog }) {
    return (
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>{blog.title}</h2>
            <h2>By: {blog.author}</h2>
            <h2>Published: {(blog.published) ? "Yes":"No"}</h2>
        </div>
    );
}