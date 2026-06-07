'use client'
import {useRef, useState} from 'react';
import Link from 'next/link';
import {Film} from "@/types";

export default function FilmSearch({ films }: { films: Film[]}) {
    const searchRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState('');
    const filteredFilms = films?.filter(film =>
        film.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>

            <div>
                <input
                    ref={searchRef}
                    type="text"
                    placeholder="Szukaj filmu..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {query &&
                <ul>
                    {filteredFilms && filteredFilms.length > 0 ? (
                        filteredFilms.map(film => (
                            <li key={film.id}>
                                <Link
                                    href={`/filmy/${film.id}`}
                                >
                                    {film.title}
                                </Link>
                                <span>({film.year})</span>
                            </li>
                        ))
                    ) : (
                        <p>Nie znaleziono filmów.</p>
                    )}
                </ul>
            }
        </div>
    );
}
