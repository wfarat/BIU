'use client'
import { useParams } from "next/navigation";
import Link from "next/link";
import {useFetch} from "@/app/hooks/useFetch";
import FavoriteButton from "@/app/components/FavoriteButton";
import {Film} from "@/types/film";

export default function FilmDetailsPage() {
    const params = useParams();
    const id = params.id;

    // Pobieramy dane konkretnego filmu
    const { data: film, loading, error } = useFetch<Film>(`/api/filmy/${id}`);

    return (
        <div>
            <Link
                href="/filmy"
            >
                ← Powrót do listy
            </Link>

            {loading && (
                <div>
                    <div></div>
                    <div></div>
                </div>
            )}

            {error && (
                <div>
                    Nie udało się załadować danych filmu: {error}
                </div>
            )}

            {film && (
                <article>
                    <header>
                        <div>
                            <h1>{film.title}</h1>
                            <p>{film.genre} • {film.year}</p>
                        </div>
                        <FavoriteButton />
                    </header>

                    <footer>
                        ID Filmu: {film.id}
                    </footer>
                </article>
            )}
        </div>
    );
}
