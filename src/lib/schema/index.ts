import { z } from "zod";

export const eventCreationSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Enter at least 4 characters long" })
    .max(73, { message: "Event Title must not exceed 73 characters long" }),
  location: z.string().min(3, { message: "Enter a valid url or a location" }),
  // eventDate: z.date({
  //   required_error: "Enter an Event Date",
  // }),
  eventDate: z.any(),
  publicEvent: z.boolean().optional(),
});

export const RsvpAcceptSchema = z.object({
  name: z.string().min(4).max(73),
  email: z.string().email("Enter a Valid Email"),
  event_id: z.number(),
  attending: z.enum(["going", "not_going", "not_sure"]),
});
