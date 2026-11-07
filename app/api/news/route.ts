import { NextResponse } from "next/server";
import { getNewsHandler, createNewsHandler } from "../../../backend/routes/newsRoutes";

export async function GET(req: Request) {
  const news = await getNewsHandler(req);
  return NextResponse.json(news);
}

export async function POST(req: Request) {
  const news = await createNewsHandler(req);
  return NextResponse.json(news, { status: 201 });
}
