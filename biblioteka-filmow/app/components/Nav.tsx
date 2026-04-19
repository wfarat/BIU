'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";

const links =  [
    {"page": "Home","href": '/'},
    {"page": "Filmy", "href": '/filmy'},
]
export default function Nav(){

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
            </ul>
        </nav>
    );
}
