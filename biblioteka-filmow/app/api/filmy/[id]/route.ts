import {deleteFilm, getFilm} from "@/lib/db";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const {id} = await params;
    const film = await getFilm(Number(id));
    if (!film) return new Response("Not found", {status: 404});
    return Response.json(film);

}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const {id} = await params;
    await deleteFilm(Number(id));
    return Response.json({message: "Deleted"});
}
