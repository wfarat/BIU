'use client'
import { useState } from 'react';

export default function FavoriteButton() {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const toggleFavorite = () => {
        setIsFavorite(prev => !prev);
    };

    return (
        <button
            onClick={toggleFavorite}
        >
            {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        </button>
    );
}
