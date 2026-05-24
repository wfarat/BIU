'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useFilmState} from "@/app/context/FilmContext";
import {useTheme} from "@/app/context/ThemeContext";

const links =  [
    {"page": "Home","href": '/'},
    {"page": "Filmy", "href": '/filmy'},
]
export default function Nav(){
    const state = useFilmState();
    const {theme, toggleTheme} = useTheme();
    const path = usePathname();
    const isActive = (href: string) => {
        if (href === '/') {
            return path === '/';
        }
        return path.startsWith(href);
    };

    return (
        <nav>
            <ul>
                {links.map(({page, href}) =>
                    <Link key={href} href={href} className={isActive(href) ? 'active' : ''}>{page}</Link>)}
                favorites: {state.favorites?.length}
            </ul>
            <button onClick={toggleTheme}>
                Zmień na tryb {theme === 'light' ? 'Ciemny 🌙' : 'Jasny ☀️'}
            </button>
        </nav>
    );
}
