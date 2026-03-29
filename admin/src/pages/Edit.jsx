import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function Edit() {
    const [post, setPost] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        const getPost = async () => {
            const response = await fetch(`http://localhost:3000/api/posts/${id}`);
            const data = await response.json();
            setPost(data[0] || data);
        }
        getPost();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get("title");
        const content = formData.get("content");

        const published = formData.get("published") === "on";

        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ title: title, content: content, published: published })
        });

        if (!response.ok) {
            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const errorData = await response.json();
                    alert(`Post failed: ${errorData.message}`);
                } else {
                    alert("Post failed: Server error");
                }
                return;
            }
        }
        e.target.reset();
        navigate("/");
    }

    if (!post) return (<div>Loading...</div>);
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input name="title" id="title" defaultValue={post.title} />
                <label htmlFor="content">Post Content: </label>
                <textarea name="content" id="content" defaultValue={post.content} />
                <label htmlFor="published">Published: </label>
                <input type="checkbox" name="published" id="published" defaultChecked={post.published} />
                <button type="submit">Post</button>
            </form>
        </>
    );
}