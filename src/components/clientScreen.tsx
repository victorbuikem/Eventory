"use client";

import { useState } from "react";
import EditForm from "./editform";
import { Button } from "./ui/button";
import { Laptop, Smartphone } from "lucide-react";
import RsvpFormSample from "./rsvpFormSample";

type Props = {
  params: {
    event_id: string;
  };
  rsvp_information: any;
};
function ClientScreen({ params, rsvp_information }: Props) {
  const [test_state, set_test_state] = useState<any>(rsvp_information);

  return (
    <>
      <section className="w-2/5 overflow-y-auto">
        <EditForm
          {...params}
          set_rsvp_information={set_test_state}
          init_rsvp_information={...test_state}
        />
      </section>
      <section className="w-3/5 bg-sky-600/10 hidden md:flex items-center flex-col gap-6 p-8 pb-12 pt-8">
        <div className="p-1 rounded-lg bg-gray-300">
          <Button variant="secondary">
            <Laptop size={16} />
          </Button>
          <Button className="bg-white text-black">
            <Smartphone size={16} />
          </Button>
        </div>

        <div className="w-full h-[90%] bg-white ring-4 p-[1px] ring-gray-800 rounded-lg">
          <RsvpFormSample {...test_state} />
        </div>
      </section>
    </>
  );
}

export default ClientScreen;
