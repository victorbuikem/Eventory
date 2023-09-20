import RsvpForm from "@/components/rsvpForm";
import { prisma } from "@/lib/server/prisma";
import Provider from "./provider";

async function Page({ params }: { params: { eventId: string } }) {
  const res = await prisma.event.findFirst({
    where: {
      event_id: params.eventId,
    },
  });
  if (!res) {
    return null;
  }

  return (
    <Provider>
      <RsvpForm slug={res.event_id} title={res.event_name} />
    </Provider>
  );
}

export default Page;
