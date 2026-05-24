'use client'
type Props = {
    handleClick: () => void;
    isFavorite: boolean;
}

export default function FavoriteButton({ handleClick, isFavorite}: Props) {

    return (
        <button
            onClick={handleClick}
        >
            {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        </button>
    );
}
