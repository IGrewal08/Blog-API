import { useEffect, useState } from "react";
export default function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch("http://localhost:3000/api/posts/sort");
                const json = await data.json();
                setData(json);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);
    return (
        <>
        </>
    );
}

function postCard({ props }) {
    return (
        <div>
            <h2>{props.title}</h2>
            <h2>{props.author}</h2>
        </div>
    );
}