import EventCard from "@/components/eventCard";
import { prisma } from "@/lib/server/prisma";
import { getUserId } from "@/lib/server/user";
import Link from "next/link";

async function Page() {
  const userId = await getUserId();

  const res = await prisma.event.findMany({
    where: {
      creator_id: userId,
    },
  });

  if (!res) {
    throw new Error("Couldn't Fetch");
  }

  return (
    <section className="pt-16">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mt-4 ml-4">Events</h2>
        {res.length >= 1 && (
          <Link
            className="inline-flex justify-center items-center rounded-md font-medium transition-colors bg-primary/75 text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mt-4 mr-4 tracking-tight text-lg"
            href="create"
          >
            Create An Event
          </Link>
        )}
      </div>
      {res.length >= 1 && (
        <div className="grid grid-cols-4 gap-3 px-10 py-8">
          {res &&
            res.map((value) => <EventCard key={value.event_id} {...value} />)}
        </div>
      )}
      {res.length === 0 && (
        <div className="flex justify-center items-center h-24">
          <Link
            className="inline-flex float-right items-center justify-center rounded-md font-medium transition-colors bg-primary/75 text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mt-4 mr-4 tracking-tight text-lg"
            href="create"
          >
            Create An Event
          </Link>
        </div>
      )}
    </section>
  );
}

export default Page;
