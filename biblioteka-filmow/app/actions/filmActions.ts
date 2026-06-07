'use server';

import { z } from 'zod';
import {revalidatePath, revalidateTag} from 'next/cache';

export type ActionState = {
    status: 'idle' | 'success' | 'error';
    message?: string;
    errors?: {
        [key: string]: string[];
    };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const filmSchema = z.object({
    title: z.string()
        .min(2, { message: 'Tytuł musi mieć co najmniej 2 znaki.' })
        .max(100, { message: 'Tytuł może mieć maksymalnie 100 znaków.' }),
    year: z.coerce.number({ message: 'Rok musi być liczbą.' })
        .min(1888, { message: 'Rok musi być nie mniejszy niż 1888.' })
        .max(2030, { message: 'Rok nie może być większy niż 2030.' }),
    genre: z.string()
        .min(1, { message: 'Gatunek jest wymagany.' })
});

export async function createFilm(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    try {
        const rawData = {
            title: formData.get('title'),
            year: formData.get('year'),
            genre: formData.get('genre'),
        };

        const validatedFields = filmSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return {
                status: 'error',
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        const response = await fetch(`${API_URL}/api/filmy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedFields.data),
        });

        if (!response.ok) {
            throw new Error(`API zwróciło błąd: ${response.status}`);
        }

        revalidateTag('films', {});

        return { status: 'success' };

    } catch (error) {
        console.error('Błąd podczas dodawania filmu:', error);
        return {
            status: 'error',
            errors: { _form: ['Wystąpił nieoczekiwany błąd serwera podczas zapisywania filmu.'] }
        };
    }
}

export async function deleteFilmAction(filmId: string): Promise<ActionState> {
    try {
        console.log('Usuwanie filmu z ID:', filmId);
        const response = await fetch(`${API_URL}/api/filmy/${filmId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`API zwróciło błąd: ${response.status}`);
        }

        revalidatePath('/filmy');
        return { status: 'success' };

    } catch (error) {
        console.error('Błąd podczas usuwania filmu:', error);
        return {
            status: 'error',
            message: 'Wystąpił nieoczekiwany błąd serwera podczas usuwania filmu.'
        };
    }
}
