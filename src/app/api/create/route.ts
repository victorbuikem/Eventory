import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { eventCreationSchema } from "@/lib/schema";
import { prisma } from "@/lib/server/prisma";
import { getUserId } from "@/lib/server/user";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { name, location, eventDate } = eventCreationSchema.parse(body);
    const userId = await getUserId();

    const tes = await prisma.event.create({
      data: {
        event_name: name,
        event_date: new Date(eventDate),
        location,
        creator_id: userId || "",
      },
    });

    return NextResponse.json(
      { success: true, eventId: tes.event_id },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Invalid Payload", error: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
