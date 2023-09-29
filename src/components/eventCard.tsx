"use client";
// import CopyButton from "@/components/copyButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
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
    <Link href={`events/${event_id}`}>
      <Card className="cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <CardTitle>{event_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="h-10 truncate">{description}</p>
          <span className="text-sm text-slate-400">{location}</span>
        </CardContent>
      </Card>
    </Link>
  );
}

export default EventCard;
