import {Film} from "@/types/film";
import {Genre} from "@/types";
import {z} from "zod";

export const FILMS: Film[] = [
    { id: 1, title: 'Oppenheimer',       year: 2023, genre: 'Dramat'  },
    { id: 2, title: 'Dune: Czesc druga', year: 2024, genre: 'Sci-Fi'  },
    { id: 3, title: 'Past Lives',        year: 2023, genre: 'Romans'  },
    { id: 4, title: 'Poor Things',       year: 2023, genre: 'Komedia' },
]

export async function getFilms() {
    return FILMS;
}

export async function getFilm(id: number) {
    return FILMS.find(f => f.id === id)
}

export async function deleteFilm(id: number) {
    const filmIndex = FILMS.findIndex(f => f.id === id);
    if (filmIndex !== -1) {
        FILMS.splice(filmIndex, 1);
    }
}

export async function addFilm(film: Film) {

    const filmSchema = z.object({
        title: z.string().min(2),
        year: z.number().int().min(1888).max(2030),
        genre: z.string()
    });

    const result = filmSchema.safeParse(film);

    if (!result.success) {
        return Response.json(
            { error: "Validation failed", details: result.error.format() },
            { status: 400 }
        );
    }
    const nextId = FILMS.reduce((acc, film) => acc < film.id ? film.id : acc, 0) + 1;

    const createdFilm = {
        id: nextId,
        ...result.data,
        genre: result.data.genre as Genre
    };

    FILMS.push(createdFilm);

    return createdFilm;
}
