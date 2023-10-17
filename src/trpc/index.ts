import { prisma } from "@/lib/server/prisma";
import { publicProcedure, router, privateProcedure } from "./trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eventCreationSchema } from "@/lib/schema";

export const appRouter = router({
  getUserEvents: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    return await prisma.event.findMany({
      where: {
        creator_id: userId,
      },
    });
  }),
  deleteUserEvent: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      //What is Wrong
      const { userId } = ctx;
      const event = await prisma.event.findFirst({
        where: {
          event_id: input.id,
          creator_id: userId,
        },
      });

      if (!event) throw new TRPCError({ code: "NOT_FOUND" });
      await prisma.event.delete({
        where: {
          event_id: input.id,
        },
      });
      return true;
    }),
  getInvitedResponse: privateProcedure
    .input(z.object({ event_id: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await prisma.rsvp.findMany({
        where: {
          event_id: input.event_id,
        },
      });

      return res;
    }),
  createEvent: privateProcedure
    .input(eventCreationSchema)
    .mutation(async ({ ctx, input }) => {
      //Create Event
      const event_res = await prisma.event.create({
        data: {
          event_name: input.name,
          event_date: new Date(input.event_date),
          location: input.location,
          creator_id: ctx.userId,
        },
      });

      //Create default Form Styling
      await prisma.rsvpForm.create({
        data: {
          form_id: event_res.event_id,
          form_title: input.name,
        },
      });

      //Return Message
      return { success: true, eventId: event_res.event_id };
    }),
  acceptRsvpForm: publicProcedure
    .input(z.object({ data: z.any() }))
    .mutation(async ({ input }) => {
      const { data } = input;

      const res = await prisma.rsvp.create({
        data: {
          invite_name: data.name || "",
          invite_email: data.email,
          event_id: data.slug,
          attending: data.attending,
        },
      });
      return true;
    }),
  editRsvpForm: privateProcedure
    .input(z.object({ data: z.any() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { data } = input;
      const res = await prisma.rsvpForm.update({
        where: {
          form_id: data.form_id,
        },
        data: {
          ...data,
        },
      });
      return true;
    }),
});

export type AppRouter = typeof appRouter;
