import ClientScreen from "@/components/clientScreen";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/server/prisma";
import { getUserId } from "@/lib/server/user";
type Props = {
  params: { event_id: string };
};

async function EventEditPage({ params }: Props) {
  const userId = await getUserId();

  const res = await prisma.event.findUnique({
    where: {
      event_id: params.event_id,
      creator_id: userId,
    },
    include: {
      RsvpForm: true,
    },
  });

  if (!res) notFound();

  return (
    <div className="pt-16 flex flex-row flex-1 min-h-[651px] h-screen max-h-fit">
      <ClientScreen params={params} rsvp_information={res?.RsvpForm[0]} />
    </div>
  );
}

export default EventEditPage;
