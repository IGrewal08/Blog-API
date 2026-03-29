import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => { 
        const fetchComments = async () => {
            try {
                const [postRes, commRes] = await Promise.all([
                    fetch(`http://localhost:3000/api/posts/${id}`),
                    fetch(`http://localhost:3000/api/comments/${id}`)
                ]);

                const postJson = await postRes.json();
                const commentsJson = await commRes.json();

                setData({ 
                    post: postJson, 
                    comments: Array.isArray(commentsJson) ? commentsJson : []
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const message = formData.get("message");
        const author = formData.get("author");

        try {
            const response = await fetch(`http://localhost:3000/api/comments/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author: author, message: message })
            });

            const savedComment = await response.json();
            setData(prev => ({
                ...prev,
                comments: [...prev.comments, savedComment]
            }));
            e.target.reset();
        } catch (error) {
            console.error("Submit error: ", error);
        }
    };

    const handleDelete = async (e, commentId) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                setData(prev => ({
                    ...prev,
                    comments: prev.comments.filter(c => c.id !== commentId) 
                }));
            } else {
                const errorData = await response.json();
                alert(`Delete failed: ${errorData.message || 'Unauthorized'}`);
            }
        } catch (error) {
            console.error("Delete error: ", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!data) return <div>Post not found.</div>;

    return (
        <>
            <div>
                <h1>{data.post.title}</h1>
                <div>
                    <div>{data.post.createdAt}</div>
                    <div>{data.post.likes}</div>
                </div>
                <hr />
                <p>{data.post.content}</p>
            </div>
            <hr />
            <h3>Comments</h3>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    (data.comments).map((comment) => (
                        <Comment 
                            key={comment.id}
                            comment={comment}
                            onDeleteClick={handleDelete}
                        />
                    ))
                )}
            </div>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <label htmlFor="message">Message:</label>
                <textarea name="message" id="message" required></textarea>
                <label htmlFor="author">Author</label>
                <input name="author" id="author" required></input>
                <button type="submit">Submit Comment</button>
            </form>
        </>
    );
}

function Comment({ comment, onDeleteClick }) {
    return (
        <div style={{ borderBottom: '1px solid #eee', padding: '10px' }}>
            <p>{comment.message}</p>
            <small>By: {comment.author} | {new Date(comment.createdAt).toLocaleDateString()}</small>
            <br />
            <button onClick={(e) => onDeleteClick(e, comment.id)}>Delete</button>
        </div>
    );
}