"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { eventCreationSchema } from "@/lib/schema";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Copy } from "lucide-react";
import Link from "next/link";

/*Types */
type Input = z.infer<typeof eventCreationSchema>;
type Props = {};

function EventCreation({}: Props) {
  const [eventLink, setEventLink] = useState<string>();
  const [created, setCreated] = useState(false);
  const router = useRouter();
  const form = useForm<Input>({
    resolver: zodResolver(eventCreationSchema),
    defaultValues: {
      name: "",
      location: "",
      eventDate: new Date(),
      publicEvent: false,
    },
  });

  const { mutate: setCreation, isLoading } = useMutation({
    mutationFn: async ({ name, location, eventDate }: Input) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}api/create`,
        {
          name,
          location,
          eventDate,
        }
      );
      return res.data;
    },
  });
  function onSubmit(input: Input) {
    setCreation(
      {
        name: input.name,
        location: input.location,
        eventDate: input.eventDate,
      },
      {
        onSuccess: ({ eventId }) => {
          setEventLink(eventId);
          setCreated(true);
          toast.success("Yay! Your event link 🎉");
        },
      }
    );
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card className="w-[425px]">
        <CardHeader>
          <Link href="events">
            <ArrowLeft size={20} />
          </Link>
          <CardTitle>New Event</CardTitle>
          <CardDescription>Create New Event</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        placeholder="Enter a Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="A location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col mt-2">
                      <FormLabel>Event Start</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <Button
                disabled={isLoading || created}
                className="w-full mt-4 text-md font-medium"
                type="submit"
              >
                {isLoading ? (
                  <div className="flex space-x-2 animate-pulse">
                    <div className="h-2 w-2 rounded-full bg-white animate-[bounce_3s_infinite]" />
                    <div className="h-2 w-2 rounded-full bg-white animate-[bounce_1.5s_infinite]" />
                    <div className="h-2 w-2 rounded-full bg-white animate-bounce" />
                  </div>
                ) : (
                  "Create Event"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {created && (
        <div className="bg-slate-100 flex items-center rounded-2xl justify-between gap-2 p-2 mt-4">
          <span>{`${process.env.NEXT_PUBLIC_SERVER_URL}rsvp/${eventLink}`}</span>
          <button
            title="Click to Copy"
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_SERVER_URL}rsvp/${eventLink}`
              );
              toast.success("Copied to Clipboard");
            }}
            className="bg-slate-200 h-8 w-8 rounded-full p-2 flex justify-center items-center"
          >
            <Copy />
          </button>
        </div>
      )}
    </div>
  );
}

export default EventCreation;
