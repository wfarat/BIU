import Link from "next/link";
import { notFound } from "next/navigation"; // 1. Import notFound

export default async function FilmDetailsPage({
                                                  params
                                              }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    console.log(id);

    const response = await fetch(`http://localhost:3000/api/filmy/${id}`);

    if (!response.ok) {
        notFound();
    }

    const film = await response.json();

    return (
        <div>
            <Link href="/filmy">
                ← Powrót do listy
            </Link>

            {film && (
                <article>
                    <header>
                        <div>
                            <h1>{film.title}</h1>
                            <p>{film.genre} • {film.year}</p>
                        </div>
                    </header>

                    <footer>
                        ID Filmu: {film.id}
                    </footer>
                </article>
            )}
        </div>
    );
}
