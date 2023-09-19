"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickr() {
  const test = new Date();
  console.log(test);
  return (
    // <Popover>
    //   <PopoverTrigger asChild>
    //     <Button
    //       variant={"outline"}
    //       className={cn("w-full justify-start text-left font-normal px-2")}
    //     >
    //       <CalendarIcon className="mr-4 h-4 w-4" />
    //       <span>Pick a date</span>
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent className="w-auto p-0" align="start"></PopoverContent>
    // </Popover>
    <input type="datetime-local" />
  );
}
