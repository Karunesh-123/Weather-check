import { Heart } from "lucide-react";

export default function FavouriteButton({ active, onClick }) {
  return (
    <button
      className={`favourite-button ${active ? "is-favourite" : ""}`}
      onClick={onClick}
      aria-label={active ? "Remove favourite" : "Add favourite"}
      title={active ? "Remove favourite" : "Add favourite"}
    >
      <Heart size={19} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
