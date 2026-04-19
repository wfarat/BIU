import {FILMS} from "@/app/api/filmy/films";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const {id} = await params;
    return Response.json(FILMS.find(f => f.id === Number(id)));
}
