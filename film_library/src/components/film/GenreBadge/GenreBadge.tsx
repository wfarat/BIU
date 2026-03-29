import type { Genre } from "../../../types/genre.ts";

const COLORS = {
    "Dramat": "red",
    "Komedia": "blue",
    "Thriller": "black",
    "Horror": "green",
    "Akcja": "yellow",
    "Fantasy": "purple",
    "Biografia": "orange",
    "Romans": "brown",
    "Sci-Fi": "pink"
}

export function GenreBadge({genre}: { genre: Genre }) {
    return (
        <span style={{backgroundColor: COLORS[genre], padding: '5px', borderRadius: '5px'}}>{genre}</span>
    )
}
