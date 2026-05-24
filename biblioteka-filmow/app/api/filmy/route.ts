import { FILMS } from "@/app/api/filmy/films";
import { z } from "zod";
import {Genre} from "@/types/genre"; // Using 'z' is the standard convention

export async function GET() {
    return Response.json(FILMS);
}
export async function POST(req: Request) {
    try {
        const film = await req.json();

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
        return Response.json(createdFilm, { status: 201 });

    } catch (err) {
        return Response.json({ error: "Invalid JSON input" }, { status: 400 });
    }
}
