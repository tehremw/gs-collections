import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>We couldn't find that page</h1>
      <Link to="/shop">Browse all bracelets</Link>
    </div>
  );
}
