import { notFound } from "next/navigation";
import { prisma } from "@/lib/server/prisma";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import axios from "axios";
import { getUserId } from "@/lib/server/user";

type Props = {
  params: { event_id: string };
};

async function EventDetailPage({ params }: Props) {
  const userId = await getUserId();

  const res = await prisma.event.findFirst({
    where: {
      event_id: params.event_id,
      creator_id: userId,
    },
  });
  if (!res) notFound();

  // const { data: inviteRes } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_SERVER_URL}api/rsvp?id=${params.event_id}`
  // );
  return (
    <div className="flex flex-col-reverse md:flex-row flex-1 md:h-[651px] pt-16">
      <div className="mx-auto max-w-7xl w-full grow lg:flex xl:px-2">
        {/* Left Side */}
        <div></div>
      </div>
      {params.event_id}{" "}
    </div>
  );
}

export default EventDetailPage;
