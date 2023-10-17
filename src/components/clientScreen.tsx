"use client";

import { useState, useRef } from "react";
import EditForm from "./editform";
import { Button } from "./ui/button";
import { Laptop, Smartphone } from "lucide-react";

type Props = {
  params: {
    event_id: string;
  };
  rsvp_information: any;
};
function ClientScreen({ params, rsvp_information }: Props) {
  const [test_state, set_test_state] = useState<any>(rsvp_information);
  const [screenView, setScreenView] = useState(true);
  const previewIframeRef = useRef<any>(null);
  return (
    <>
      <section className="md:w-2/5 w-full overflow-y-auto">
        <EditForm
          {...params}
          iFrameRef={previewIframeRef}
          init_rsvp_information={...rsvp_information}
        />
      </section>
      <section className="w-3/5 bg-sky-600/10 hidden md:flex items-center flex-col overflow-y-scroll p-8 pb-12 h-full">
        <div className="p-1 rounded-lg bg-gray-300 mb-4">
          <Button
            size="sm"
            onClick={() => {
              setScreenView(true);
            }}
            variant={screenView ? "secondary" : "ghost"}
            className={screenView ? "" : "hover:bg-transparent"}
          >
            <Laptop size={16} />
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setScreenView(false);
            }}
            variant={!screenView ? "secondary" : "ghost"}
            className={!screenView ? "" : "hover:bg-transparent"}
          >
            <Smartphone size={16} />
          </Button>
        </div>

        <div
          className={`${
            screenView
              ? "w-full h-[90%] rounded-lg"
              : "w-[330px] h-[628px] rounded-2xl"
          } bg-white ring-4 overflow-hidden ring-gray-800 duration-300`}
        >
          <iframe
            ref={previewIframeRef}
            className=""
            width="100%"
            height="100%"
            style={{ display: "block" }}
            title="A Preview for your form"
            sandbox="allow-scripts allow-same-origin"
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/rsvp/${params.event_id}?preview=true`}
          ></iframe>
        </div>
      </section>
    </>
  );
}

export default ClientScreen;
