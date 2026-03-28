import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [link, setLink] = useState("New");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/posts?sort=${link}`);
                const json = await response.json();
                setData(Array.isArray(json) ? json : (json.rows || []));
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [link]);

    return (
        <>
            <div>
                <select value={link} onChange={(e) => setLink(e.target.value)}>
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
                    data.map((blog) => {
                        <Link key={blog.id} to={`/post/${blog.id}`}>
                            <PostCard 
                                title={blog.title}
                                author={blog.author}
                            />
                        </Link>
                    })
                )}
            </div>
        </>
    );
}

function PostCard({ title, author }) {
    return (
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>{title}</h2>
            <h2>By: {author}</h2>
        </div>
    );
}