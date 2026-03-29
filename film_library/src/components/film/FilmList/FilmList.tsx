import type {Film} from "../../../types/film.ts";
import { FilmCard } from "../FilmCard/FilmCard.tsx";

type Props = {
    title: string;
    films: Film[];
}

export function FilmList({ title, films }: Props) {

    return (
        <div>
            <h2>{title}</h2>
            {films.map(film => <FilmCard key={film.id} {...film}/>)}
        </div>
    )
}
