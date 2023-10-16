import { notFound } from "next/navigation";
import { prisma } from "@/lib/server/prisma";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import { getUserId } from "@/lib/server/user";
import InvitedList from "@/components/invitedList";

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

  return (
    <div className="flex flex-col-reverse md:flex-row flex-1 justify-between md:h-[calc(100vh)] pt-16">
      <div className="mx-auto max-w-full w-full grow flex flex-col-reverse md:flex-row">
        {/* Left Side */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-4">
            <div className="">
              <div className="flex gap-2 items-center relative">
                <Link href="/events" className="p-2 text-primary">
                  <ArrowLeft size={20} />
                </Link>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-800">
                  {res?.event_name}
                </h2>
                <Link
                  className="p-2 text-primary absolute right-0"
                  href={`/edit/${params.event_id}`}
                >
                  <Edit />
                </Link>
              </div>

              <div className="flex flex-col md:flex-row justify-between mt-2">
                <span>{res?.location}</span>
                <span>{res?.event_date.toLocaleDateString()}</span>
              </div>
            </div>
            <InvitedList event_id={params.event_id} />
          </div>
        </div>
        <div className="shrink-0 md:flex-[0.75] bg-gradient-to-br from-blue-500 to-cyan-400 h-20 md:h-full" />
      </div>
    </div>
  );
}

export default EventDetailPage;
