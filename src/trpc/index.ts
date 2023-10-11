import { prisma } from "@/lib/server/prisma";
import { publicProcedure, router, privateProcedure } from "./trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

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
      return event;
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
});

export type AppRouter = typeof appRouter;
