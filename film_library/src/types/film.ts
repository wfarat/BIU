import type { Genre } from "./genre.ts";

export type Film = {
    id: number,
    title: string,
    year: number,
    rating: number,
    genre: Genre,
    watched: boolean}
