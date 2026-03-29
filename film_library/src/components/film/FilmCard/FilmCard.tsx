import type {Film} from "../../../types/film.ts";
import { WatchedBadge } from "../WatchedBadge/WatchedBadge.tsx";
import { RatingStars } from "../RatingStars/RatingStars.tsx";
import { GenreBadge } from "../GenreBadge/GenreBadge.tsx";

export function FilmCard({ title, year, genre, rating, watched }: Film) {

    return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
        <h3>{title} ({year})</h3>
        <GenreBadge genre={genre}/>
        <RatingStars rating={rating}/>
        <WatchedBadge watched={watched}/>
    </div>
    )
}
