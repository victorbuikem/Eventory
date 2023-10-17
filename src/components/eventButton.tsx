"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { eventCreationSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

type Props = {};

function EventButton({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button className="">Create An Event</Button>
      </DialogTrigger>
      <DialogContent>
        <EventCreationForm />
      </DialogContent>
    </Dialog>
  );
}

export default EventButton;

/*===========================*/

type Input = z.infer<typeof eventCreationSchema>;

function EventCreationForm() {
  const router = useRouter();
  const [created, setCreated] = useState(false);
  const form = useForm<Input>({
    resolver: zodResolver(eventCreationSchema),
    defaultValues: {
      name: "",
      location: "",
      event_date: new Date(),
      publicEvent: false,
    },
  });

  const { mutate: createNewEvent, isLoading } = trpc.createEvent.useMutation({
    onSuccess: ({ eventId }) => {
      setCreated(true);
      toast.success("Yay! Your event link 🎉");
      router.push(`/edit/${eventId}`);
    },
  });
  return (
    <>
      <div className="max-w-[400px] relative p-1">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">
            Create New Event
          </h3>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((input: Input) => {
                createNewEvent({
                  name: input.name,
                  event_date: input.event_date,
                  location: input.location,
                });
              })}
              className=""
            >
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
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="event_date"
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

              <Button className="w-full mt-4 text-md font-medium" type="submit">
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
        </div>
        {created ? (
          <div className="bg-gray-300/10 w-full h-full absolute top-0 p-2 flex items-center justify-center gap-2">
            <Loader2 className="animate-spin h-6 w-6" />
            <span>Redirecting...</span>
          </div>
        ) : null}
      </div>
    </>
  );
}
