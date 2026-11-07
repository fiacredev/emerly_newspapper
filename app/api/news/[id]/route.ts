import { NextResponse } from "next/server";
import { deleteNewsHandler } from "../../../../backend/routes/newsRoutes";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const news = await deleteNewsHandler(_req, { params });
  return NextResponse.json(news);
}
