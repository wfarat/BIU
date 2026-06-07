'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {ActionState, createFilm} from '@/app/actions/filmActions';
import SubmitButton from '@/app/components/SubmitButton';

const initialState: ActionState = {
    status: 'idle'
};

export default function AddFilmPage() {
    const router = useRouter();

    const [state, formAction] = useActionState(createFilm, initialState);

    useEffect(() => {
        if (state?.status === 'success') {
            router.push('/filmy');
        }
    }, [state, router]);

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dodaj Nowy Film</h1>

            {state?.status === 'error' && (
                <div style={{ color: 'red', marginBottom: '1rem' }}>
                    {state.message || 'Proszę poprawić błędy w formularzu.'}
                    {state.errors?._form && <p>{state.errors._form.join(', ')}</p>}
                </div>
            )}

            {state?.status === 'success' && (
                <div style={{ color: 'green', marginBottom: '1rem' }}>
                    Film został dodany pomyślnie! Przekierowywanie...
                </div>
            )}

            <form action={formAction} className="flex flex-col gap-4">

                <div>
                    <label htmlFor="title" className="block mb-1">Tytuł</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className="border p-2 w-full"
                    />
                    {state?.errors?.title && (
                        <div style={{ color: 'red', fontSize: '0.875rem' }}>
                            {state.errors.title.join(', ')}
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="year" className="block mb-1">Rok produkcji</label>
                    <input
                        id="year"
                        name="year"
                        type="number"
                        className="border p-2 w-full"
                    />
                    {state?.errors?.year && (
                        <div style={{ color: 'red', fontSize: '0.875rem' }}>
                            {state.errors.year.join(', ')}
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="genre" className="block mb-1">Gatunek</label>
                    <select
                        id="genre"
                        name="genre"
                        className="border p-2 w-full"
                    >
                        <option value="">-- Wybierz gatunek --</option>
                        <option value="Dramat">Dramat</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Komedia">Komedia</option>
                        <option value="Horror">Horror</option>
                    </select>
                    {state?.errors?.genre && (
                        <div style={{ color: 'red', fontSize: '0.875rem' }}>
                            {state.errors.genre.join(', ')}
                        </div>
                    )}
                </div>

                <SubmitButton />
            </form>
        </div>
    );
}
