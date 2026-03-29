import { Link } from "react-router-dom";

export default function ErrorPage () {
  return (
    <div>
      <h1>Error, this page doesn't exist or is broken!</h1>
      <Link to="/">Click here to go back to the home page.</Link>
    </div>
  );
};