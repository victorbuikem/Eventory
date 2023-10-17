import { z } from "zod";

export const eventCreationSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Enter at least 4 characters long" })
    .max(73, { message: "Event Title must not exceed 73 characters long" }),
  location: z.string().min(3, { message: "Enter a valid url or a location" }),
  event_date: z.any(),
  publicEvent: z.boolean().optional(),
});

export const RsvpAcceptSchema = z.object({
  name: z.string().min(4).max(73).optional(),
  email: z.string().email("Enter a Valid Email").optional(),
  event_id: z.string(),
  attending: z.enum(["going", "not_going", "not_sure"]),
});

export const RsvpFormLabelSchema = z.object({
  form_id: z.string(),
  form_title: z.string(),
  primary_color: z.string().optional(),
  font: z.string(),
  logo: z.any(),
  your_name_disply: z.boolean(),
  your_name_label: z.string(),
  your_name_placeholder: z.string(),
  email_address_display: z.boolean(),
  email_address_label: z.string(),
  email_address_placeholder: z.string(),
  submit_invite_label: z.string(),
  description: z.string().max(253),
});
