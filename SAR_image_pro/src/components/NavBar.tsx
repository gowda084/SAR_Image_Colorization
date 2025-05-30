
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between py-4 px-8 bg-radar-blue text-white shadow-md">
      <Link to="/" className="text-2xl font-bold tracking-tight">SAR Colorizer</Link>
      <div className="flex gap-6 text-md">
        <Link to="/" className="hover:text-radar-highlight transition">Home</Link>
        <Link to="/upload" className="hover:text-radar-highlight transition">Upload</Link>
        <Link to="/results" className="hover:text-radar-highlight transition">Results</Link>
        <Link to="/history" className="hover:text-radar-highlight transition">History</Link>
        <Link to="/about" className="hover:text-radar-highlight transition">About</Link>
      </div>
    </nav>
  );
}
