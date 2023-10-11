"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {};

function EventDashboard({}: Props) {
  const utils = trpc.useContext();
  const [deleting, setDeleting] = useState<string | null>(null);
  const { data: events, isLoading } = trpc.getUserEvents.useQuery();
  const { mutate: deleteUserEvent } = trpc.deleteUserEvent.useMutation({
    onSuccess: () => {
      utils.getUserEvents.invalidate();
    },
    onMutate: ({ id }) => {
      setDeleting(id);
    },
    onSettled: () => {
      setDeleting(null);
    },
  });
  return (
    <section className="pt-16 mx-auto max-w-7xl md:px-10">
      <div className="flex justify-between items-end px-2">
        <h1 className="text-3xl font-bold mt-4">My Events</h1>
        <Link className={buttonVariants({ variant: "default" })} href="create">
          Create An Event
        </Link>
      </div>
      {events && events?.length !== 0 ? (
        <div className="grid md:grid-cols-3 gap-3 px-4 py-4 md:py-8">
          {events
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map(({ event_id, event_name, location, description }) => (
              <Card key={event_id}>
                <CardHeader className="flex flex-row items-center justify-between p-4">
                  <Link href={`events/${event_id}`}>
                    <CardTitle className="cursor-pointer">
                      {event_name}
                    </CardTitle>
                  </Link>
                </CardHeader>
                <CardContent>
                  <p className="h-10 truncate">{description}</p>
                  <span className="text-sm text-slate-400">{location}</span>
                </CardContent>

                <Button
                  size="sm"
                  variant="destructive"
                  className="w-16 float-right m-2"
                  onClick={() => {
                    deleteUserEvent({ id: event_id });
                  }}
                >
                  {deleting === event_id ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </Card>
            ))}
        </div>
      ) : isLoading ? (
        <div className="mt-20 flex flex-col items-center gap-2">
          <Loader2 className="text-blue-500 animate-spin h-10 w-10" />
          <span className="text-slate-400 text-xl ">Setting Up...</span>
        </div>
      ) : (
        <div className="mt-20 flex justify-center gap-2">
          <span className="text-slate-400 text-xl ">Nothing is Here</span>
        </div>
      )}
    </section>
  );
}

export default EventDashboard;
