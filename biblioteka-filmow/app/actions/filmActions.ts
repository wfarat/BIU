import { Film } from "@/types";
import { Dispatch } from "react";
import { FilmAction } from "@/app/reducers/filmReducer";

export async function fetchData(
    url: string,
    dispatch: Dispatch<FilmAction>,
    signal?: AbortSignal
) {
    dispatch({ type: 'FETCH_START' });

    try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();

        const payload = Array.isArray(result) ? result : [result];

        dispatch({
            type: 'FETCH_SUCCESS',
            payload: payload as Film[]
        });
    } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;

        dispatch({
            type: 'FETCH_ERROR',
            payload: err instanceof Error ? err.message : "Unknown error"
        });
    }
}

export async function addFilm(film: Record<string, string | number>, dispatch: Dispatch<FilmAction>) {
    try {
        const response = await fetch('/api/filmy', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(film),
        });
        if (Math.random() > 0.5) throw new Error("Random error");
        const newFilm = await response.json();
        dispatch({
            type: 'ADD_FILM',
            payload: newFilm
        });
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {message: `Film ${newFilm.title} added successfully`, type: 'success'}
        });

        // @ts-ignore
        return newFilm.id;
    } catch (error) {
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {message: `Error adding film: ${error}`, type: 'error'}
        })
    }
}
