import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
    const { id } = useParams;
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        const fetchComments = async () => {
            try {
                const getPost = await fetch(`http://localhost:3000/api/posts/${id}`);
                const getComments = await fetch(`http://localhost:3000/api/comments/${id}`);
                const postJson = await getPost.json();
                const commentsJson = await getComments.json();
                setData({ 
                    post: (postJson.rows[0] || postJson), 
                    comments: (commentsJson.rows || postJson) 
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [setData]);

    const handleSubmit = async (e) => {
        const { message, author } = e.target;
        const response = await fetch(`http://localhost:3000/api/comments/${id}`, {
            method: 'POST',
            body: JSON.stringify({ author: author, message: message })
        });

        const savedComment = await response.json();
        const updatedData = {
            ...data,
            comments: [...data.comments, savedComment]
        };
        setData(updatedData);
    }

    return (
        <>
            <div>
                <h1>{data.post.title}</h1>
                <div>
                    <div>{data.post.createdAt}</div>
                    <div>{data.post.likes}</div>
                </div>
                <p>{data.post.content}</p>
            </div>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    (data.comments).map((comment) => {
                        <Comment 
                            key={comment.id}
                            message={comment.message}
                            author={comment.author}
                            createdAt={comment.createdAt}
                        />
                    })
                )}
            </div>
            <form action="http://localhost:3000/api/comments" method="POST" onSubmit={handleSubmit}>
                <label for="message">Message:</label>
                <textarea name="message" id="message"></textarea>
                <label for="author">Author</label>
                <input name="author" id="author"></input>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

function Comment({ message, author, createdAt }) {
    return (
        <>
            <div>{message}</div>
            <div>
                <div>Author: {author}</div>
                <div>Created At: {createdAt}</div>
            </div>
        </>
    );
}