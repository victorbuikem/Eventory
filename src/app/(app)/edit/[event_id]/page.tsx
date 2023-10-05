import ClientScreen from "@/components/clientScreen";
import { prisma } from "@/lib/server/prisma";
type Props = {
  params: { event_id: string };
};

async function EventEditPage({ params }: Props) {
  const res = await prisma.event.findUnique({
    where: {
      event_id: params.event_id,
    },
    include: {
      RsvpForm: true,
    },
  });

  return (
    <div className="pt-16 flex flex-row flex-1 min-h-[651px] h-screen">
      <ClientScreen params={params} rsvp_information={res?.RsvpForm[0]} />
    </div>
  );
}

export default EventEditPage;
