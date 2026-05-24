import { Film, Notification } from "@/types";

export interface FilmState {
    films: Film[];
    loading: boolean;
    error: string | null;
    query: string;
    favorites: (string | number)[];
    notifications: Notification[];
}

export type FilmAction =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: Film[] }
    | { type: 'FETCH_ERROR'; payload: string }
    | { type: 'SET_QUERY'; payload: string }
    | { type: 'TOGGLE_FAVORITE'; payload: string | number }
    | { type: 'ADD_FILM'; payload: Film }
    | { type: 'ADD_NOTIFICATION'; payload: { message: string; type: Notification['type'] } }
    | { type: 'DISMISS_NOTIFICATION'; payload: number };

export const initialFilmState: FilmState = {
    films: [],
    loading: false,
    error: null,
    query: '',
    favorites: [],
    notifications: []
};

export const filmReducer = (state: FilmState, action: FilmAction): FilmState => {
    switch (action.type) {
        case 'FETCH_START':
            return {
                ...state,
                loading: true,
                error: null
            };

        case 'FETCH_SUCCESS':
            return {
                ...state,
                films: action.payload,
                loading: false
            };

        case 'FETCH_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case 'SET_QUERY':
            return {
                ...state,
                query: action.payload
            };

        case 'TOGGLE_FAVORITE':
            const isFavorite = state.favorites.includes(action.payload);
            return {
                ...state,
                favorites: isFavorite
                    ? state.favorites.filter((id) => id !== action.payload)
                    : [...state.favorites, action.payload]
            };

        case 'ADD_FILM':
            return {
                ...state,
                films: [...state.films, action.payload]
            };

        case 'ADD_NOTIFICATION':
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        id: Date.now(),
                        message: action.payload.message,
                        type: action.payload.type
                    }
                ]
            };

        case 'DISMISS_NOTIFICATION':
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notif) => notif.id !== action.payload
                )
            };

        default:
            const _exhaustiveCheck: never = action;
            throw new Error(`Unhandled action type: ${(action as any).type}`);
    }
};
