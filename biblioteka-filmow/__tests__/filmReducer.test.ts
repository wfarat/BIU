import { filmReducer, initialFilmState } from '@/app/reducers/filmReducer';

describe('filmReducer', () => {

    // Pomocnicza funkcja zamrażająca stan, aby testować niemutowalność
    const getFrozenState = (customState = {}) => {
        const state = { ...initialFilmState, ...customState };
        Object.freeze(state);
        if (state.films) Object.freeze(state.films);
        if (state.favorites) Object.freeze(state.favorites);
        if (state.notifications) Object.freeze(state.notifications);
        return state;
    };

    test('FETCH_START: powinno ustawić loading na true i zresetować błędy', () => {
        const state = getFrozenState({ error: 'Poprzedni błąd' });
        const action = { type: 'FETCH_START' };
        const newState = filmReducer(state, action);

        expect(newState.loading).toBe(true);
        expect(newState.error).toBeNull();
    });

    test('FETCH_SUCCESS: powinno dodać filmy i wyłączyć loading', () => {
        const state = getFrozenState({ loading: true });
        const mockFilms = [{ id: 1, title: 'Inception' }];
        const action = { type: 'FETCH_SUCCESS', payload: mockFilms };
        const newState = filmReducer(state, action);

        expect(newState.films).toEqual(mockFilms);
        expect(newState.loading).toBe(false);
    });

    test('FETCH_ERROR: powinno ustawić błąd i wyłączyć loading', () => {
        const state = getFrozenState({ loading: true });
        const action = { type: 'FETCH_ERROR', payload: 'Serwer nie odpowiada' };
        const newState = filmReducer(state, action);

        expect(newState.error).toBe('Serwer nie odpowiada');
        expect(newState.loading).toBe(false);
    });

    test('SET_QUERY: powinno zaktualizować frazę wyszukiwania', () => {
        const state = getFrozenState();
        const action = { type: 'SET_QUERY', payload: 'Batman' };
        const newState = filmReducer(state, action);

        expect(newState.query).toBe('Batman');
    });

    test('TOGGLE_FAVORITE: powinno dodawać i usuwać ID z ulubionych', () => {
        const state = getFrozenState({ favorites: [1] });

        // Test usuwania
        const removeAction = { type: 'TOGGLE_FAVORITE', payload: 1 };
        const stateAfterRemove = filmReducer(state, removeAction);
        expect(stateAfterRemove.favorites).not.toContain(1);

        // Test dodawania
        const addAction = { type: 'TOGGLE_FAVORITE', payload: 2 };
        const stateAfterAdd = filmReducer(stateAfterRemove, addAction);
        expect(stateAfterAdd.favorites).toContain(2);
    });

    test('ADD_FILM: powinno dopisać nowy film do tablicy', () => {
        const state = getFrozenState({ films: [{ id: 1, title: 'Film 1' }] });
        const newFilm = { id: 2, title: 'Film 2' };
        const action = { type: 'ADD_FILM', payload: newFilm };
        const newState = filmReducer(state, action);

        expect(newState.films).toHaveLength(2);
        expect(newState.films[1]).toEqual(newFilm);
    });

    test('ADD_NOTIFICATION: powinno dodać obiekt powiadomienia z ID', () => {
        const state = getFrozenState();
        const action = { type: 'ADD_NOTIFICATION', payload: { message: 'Sukces', type: 'success' } };
        const newState = filmReducer(state, action);

        expect(newState.notifications).toHaveLength(1);
        expect(newState.notifications[0]).toMatchObject({
            message: 'Sukces',
            type: 'success'
        });
        expect(newState.notifications[0].id).toBeDefined();
    });

    test('DISMISS_NOTIFICATION: powinno usunąć powiadomienie po ID', () => {
        const state = getFrozenState({
            notifications: [{ id: 123, message: 'Test', type: 'info' }]
        });
        const action = { type: 'DISMISS_NOTIFICATION', payload: 123 };
        const newState = filmReducer(state, action);

        expect(newState.notifications).toHaveLength(0);
    });

    test('IMMUTABILITY: reducer nie powinien mutować oryginalnego stanu', () => {
        const state = getFrozenState({ favorites: [1] });
        const action = { type: 'TOGGLE_FAVORITE', payload: 2 };

        expect(() => filmReducer(state, action)).not.toThrow();

        const newState = filmReducer(state, action);
        expect(newState).not.toBe(state);
        expect(newState.favorites).not.toBe(state.favorites);
    });

    test('DEFAULT: rzuca Error dla nieobsłużonej akcji', () => {
        const state = getFrozenState();
        const action = { type: 'UNKNOWN_ACTION_TYPE' };

        expect(() => filmReducer(state, action)).toThrow('Unhandled action type');
    });

});
