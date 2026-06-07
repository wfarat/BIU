import Link from 'next/link';
import FilmSearch from "@/app/components/FilmSearch";
import {Film} from "@/types";
import FilmListOptimistic from "@/app/components/FilmListOptimistic";
export const revalidate = 60
export default async function FilmyPage() {
    const response = await fetch('http://localhost:3000/api/filmy', {
        next: { tags: ['films'] }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch films');
    }

    const films = await response.json() as Film[];
    return (
        <div>
            <h1>Lista Filmów</h1>
            <FilmListOptimistic films={films} />
            <FilmSearch films={films}/>

            <Link href="/filmy/dodaj">Dodaj Film</Link>
        </div>
    );
}
