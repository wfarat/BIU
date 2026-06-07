import {addFilm, getFilms} from "@/lib/db"; // Using 'z' is the standard convention

export async function GET() {
    const films = await getFilms();
    return Response.json(films);
}

export async function POST(req: Request) {
    try {
        const film = await req.json();
        const createdFilm = addFilm(film);
        return Response.json(createdFilm, {status: 201});

    } catch (err) {
        return Response.json({error: "Invalid JSON input"}, {status: 400});
    }
}
