"use client";

import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  event_id: string;
};

function InvitedList({ event_id }: Props) {
  const { data: invitedRes, isLoading } = trpc.getInvitedResponse.useQuery({
    event_id,
  });
  console.log(invitedRes);

  return (
    <div className="mt-4">
      {invitedRes && invitedRes.length !== 0 ? (
        <ScrollArea className="h-[400px] px-4 py-2 md:h-[73.3%]">
          {invitedRes.map(
            ({ invite_id, invite_email, attending, invite_name }) => (
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
            )
          )}
        </ScrollArea>
      ) : isLoading ? (
        <div className="mt-20 flex flex-col items-center gap-2">
          <Loader2 className="text-blue-500 animate-spin h-10 w-10" />
          <span className="text-slate-400 text-xl ">Coming Up...</span>
        </div>
      ) : (
        <p>4erfnbjre</p>
      )}
    </div>
  );
}

export default InvitedList;
