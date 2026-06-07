'use client';

import { useOptimistic, useTransition } from 'react';
import { deleteFilmAction } from '@/app/actions/filmActions';
import {Film} from "@/types";

export default function FilmListOptimistic({ films }: { films: Film[] }) {
    const [optimisticFilms, addOptimisticFilmToRemove] = useOptimistic(
        films,
        (currentState, filmIdToRemove) =>
            currentState.filter((film: Film) => film.id !== filmIdToRemove)
    );

    const [isPending, startTransition] = useTransition();

    const handleDelete = (id: number) => {
        startTransition(async () => {
            addOptimisticFilmToRemove(id);

            const result = await deleteFilmAction(String(id));

            if (result?.status === 'error') {
                console.error('Nie udało się usunąć filmu:', result.message);
                alert('Wystąpił błąd podczas usuwania. Film zostanie przywrócony.');
            }
        });
    };

    return (
        <ul className="space-y-3 mt-4">
            {optimisticFilms.length === 0 ? (
                <p className="text-gray-500">Brak filmów. Dodaj coś!</p>
            ) : (
                optimisticFilms.map((film) => (
                    <li
                        key={film.id}
                    >
                        {film.title} {film.genre} • {film.year}
                        <button
                            onClick={() => handleDelete(film.id)}
                            aria-label={`Usuń film ${film.title}`}
                        >
                            X
                        </button>
                    </li>
                ))
            )}
        </ul>
    );
}
