import { useNavigate } from "react-router-dom";
export default function New() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const title = formData.get("title");
            const content = formData.get("content");

            const published = formData.get("published") === "on";

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
                // Check if the response is actually JSON before parsing
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const errorData = await response.json();
                    alert(`Post failed: ${errorData.message}`);
                } else {
                    alert("Post failed: Server error");
                }
                return; // Stop here so we don't navigate on failure
            }
            e.target.reset();
            navigate("/");
        } catch (error) {
            console.error("Error Posting: ", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input name="title" id="title"></input>
                <label htmlFor="content">Post Content: </label>
                <textarea name="content" id="content"></textarea>
                <label htmlFor="published">Published: </label>
                <input type="checkbox" name="published" id="published"></input>
                <button type="submit">Post</button>
            </form>
        </>
    );
}