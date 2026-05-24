'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';
import { filmReducer, initialFilmState, FilmState, FilmAction } from '@/app/reducers/filmReducer';
import { fetchData } from '@/app/actions/filmActions';

const FilmStateContext = createContext<FilmState | undefined>(undefined);
const FilmDispatchContext = createContext<Dispatch<FilmAction> | undefined>(undefined);

interface FilmProviderProps {
    children: ReactNode;
}

export const FilmProvider = ({ children }: FilmProviderProps) => {
    const [state, dispatch] = useReducer(filmReducer, initialFilmState);

    useEffect(() => {
        const controller = new AbortController();
        fetchData('/api/filmy', dispatch, controller.signal);

        return () => controller.abort();
    }, []);

    return (
        <FilmStateContext.Provider value={state}>
            <FilmDispatchContext.Provider value={dispatch}>
                {children}
            </FilmDispatchContext.Provider>
        </FilmStateContext.Provider>
    );
};

export const useFilmState = (): FilmState => {
    const context = useContext(FilmStateContext);
    if (context === undefined) {
        throw new Error('useFilmState must be used within a FilmProvider');
    }
    return context;
};

export const useFilmDispatch = (): Dispatch<FilmAction> => {
    const context = useContext(FilmDispatchContext);
    if (context === undefined) {
        throw new Error('useFilmDispatch must be used within a FilmProvider');
    }
    return context;
};
