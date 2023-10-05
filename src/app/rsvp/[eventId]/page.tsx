import RsvpForm from "@/components/rsvpForm";
import { prisma } from "@/lib/server/prisma";

async function Page({ params }: { params: { eventId: string } }) {
  const res = await prisma.event.findFirst({
    where: {
      event_id: params.eventId,
    },
    include: {
      RsvpForm: true,
    },
  });

  if (!res) {
    return <p>Invalid Invite Link</p>;
  }

  return (
    <RsvpForm
      slug={res.event_id}
      title={res.RsvpForm[0].form_title}
      description={res.RsvpForm[0].description}
      your_name_label={res.RsvpForm[0].your_name_label}
      buttonLabel={res.RsvpForm[0].submit_invite_label}
      email_address_label={res.RsvpForm[0].email_address_label}
      primaryColor={res.RsvpForm[0].primary_color}
      your_name_display={res.RsvpForm[0].your_name_disply}
      your_name_placeholder={res.RsvpForm[0].your_name_placeholder}
      email_address_placeholder={res.RsvpForm[0].email_address_placeholder}
      email_address_display={res.RsvpForm[0].email_address_display}
    />
  );
}

export default Page;
