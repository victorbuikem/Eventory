"use client";
// import CopyButton from "@/components/copyButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

type Props = {
  event_id: string;
  event_name: string;
  event_date: Date;
  location: string | null;
  description: string | null;
  creator_id: string;
  created_at: Date;
};

function EventCard({ event_name, event_id, description, location }: Props) {
  const router = useRouter();
  return (
    <Card
      className="cursor-pointer"
      onClick={() => router.push(`events/${event_id}`)}
    >
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle>{event_name}</CardTitle>
        {/* <CopyButton copyUrl={`http://localhost:3000/rsvp/p/${event_id}`} /> */}
      </CardHeader>
      <CardContent>
        <p className="h-10 truncate">{description}</p>
        <span className="text-sm text-slate-400">{location}</span>
      </CardContent>
    </Card>
  );
}

export default EventCard;
