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
        const published = formData.get("published");

        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:3000/api/posts", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ title: title, content: content, published: published })
        });
        if (!response.ok) {
            const errorData = await response.json();
            alert(`Post failed: ${errorData.message || 'Unauthorized'}`);
        }
        e.target.reset();
        navigate("/");
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input name="title" id="title" value={post.title}></input>
                <label htmlFor="content">Post Content: </label>
                <textarea name="content" id="content">{post.content}</textarea>
                <label htmlFor="published">Published: </label>
                <input type="checkbox" name="published" id="published"></input>
                <button type="submit">Post</button>
            </form>
        </>
    );
}