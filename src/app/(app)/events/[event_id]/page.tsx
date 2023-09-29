import { redirect } from "next/navigation";
import { prisma } from "@/lib/server/prisma";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import axios from "axios";
type Props = {
  params: { event_id: string };
};

async function EventDetailPage({ params }: Props) {
  const res = await prisma.event.findFirst({
    where: {
      event_id: params.event_id,
    },
  });
  if (!res) {
    redirect("/events");
  }

  const { data: inviteRes } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}api/rsvp?id=${params.event_id}`
  );
  return (
    <div className="pt-16 flex flex-row flex-1 h-[651px]">
      <section className="w-3/5">
        <div className="p-4 py-2">
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
          <p className="text-gray-500 tracking-tight leading-6 max-h-[70px] overflow-hidden text-ellipsis">
            {res?.description}
          </p>
          <div className="flex justify-between mt-2">
            <span>{res?.location}</span>
            <span>{res?.event_date.toLocaleDateString()}</span>
          </div>
        </div>
        {inviteRes.data.length >= 1 && (
          <ScrollArea className="h-[73.4%] px-4 py-2">
            {inviteRes.data.map(
              ({ invite_id, invite_name, invite_email, attending }: any) => {
                return (
                  <div
                    key={invite_id}
                    className="first:my-0 my-2 p-2 pr-8 rounded-md flex justify-between items-center"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {invite_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {invite_email}
                      </p>
                    </div>
                    <div
                      className={`cursor-default h-2 w-2 rounded-full ${
                        attending === "not_sure"
                          ? "bg-yellow-500 "
                          : attending === "not_going"
                          ? "bg-red-400 "
                          : "bg-green-400"
                      }`}
                    />
                  </div>
                );
              }
            )}
          </ScrollArea>
        )}
        {inviteRes.data.length == 0 && (
          <div className="flex items-center justify-center h-[73.4%]">
            <div className="flex flex-col gap-2">
              <p className="text-lg text-center leading-none">
                You do not have any invitees
              </p>
            </div>
          </div>
        )}
      </section>
      <div className="bg-gradient-to-bl from-purple-800 via-blue-300 to-yellow-200 w-2/5 h-full"></div>
    </div>
  );
}

export default EventDetailPage;
