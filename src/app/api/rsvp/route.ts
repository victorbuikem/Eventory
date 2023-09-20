import { prisma } from "@/lib/server/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const res = await prisma.rsvp.findMany({
      where: {
        event_id: id || "",
      },
    });

    return NextResponse.json(
      { success: true, eventId: id, data: res },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
