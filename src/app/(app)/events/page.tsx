import EventDashboard from "@/components/eventDashboard";
import { getUserId } from "@/lib/server/user";

async function Page() {
  const userId = await getUserId();

  return <EventDashboard />;
}

export default Page;
