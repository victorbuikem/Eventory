import { RsvpAcceptSchema } from "@/lib/schema";
import { prisma } from "@/lib/server/prisma";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, attending, event_id, email } = RsvpAcceptSchema.parse(body);

    const res = await prisma.rsvp.create({
      data: {
        invite_name: name,
        invite_email: email,
        event_id,
        attending,
      },
    });
    return NextResponse.json({ success: true }, { status: 200 });
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
