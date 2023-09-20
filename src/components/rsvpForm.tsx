"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { RsvpAcceptSchema } from "@/lib/schema";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import ConfettiExplosion from "react-confetti-explosion";
import axios from "axios";
import { useState } from "react";
/*Types */
type Props = {
  slug: string;
  title: string | undefined;
};

type Input = z.infer<typeof RsvpAcceptSchema>;

function RsvpForm({ slug, title }: Props) {
  const [success, setSucess] = useState(false);
  const form = useForm<Input>({
    resolver: zodResolver(RsvpAcceptSchema),
    defaultValues: {
      name: "",
      email: "",
      attending: undefined,
      event_id: parseInt(slug),
    },
  });

  const { mutate: createEvent, isLoading } = useMutation({
    mutationFn: async ({ name, email, event_id, attending }: Input) => {
      const res = await axios.post("/api/v1/rsvp", {
        name,
        email,
        event_id,
        attending,
      });
      return res.data;
    },
  });

  /*Submit Functionality */
  function onSubmit(input: Input) {
    createEvent(
      {
        name: input.name,
        email: input.email,
        attending: input.attending,
        event_id: parseInt(slug),
      },
      {
        onSuccess: () => {
          setSucess(true);
        },
        onError: () => {
          alert("Something went wrong");
        },
      }
    );
  }

  return (
    <div className="min-h-full">
      <div className="flex flex-1">
        {success && (
          <ConfettiExplosion
            duration={3000}
            particleCount={400}
            width={2000}
            force={0.9}
          />
        )}
        <main className="flex flex-col items-center justify-center flex-1 flex-shrink-0 px-5 pt-16 pb-8 border-r shadow-lg h-screen bg-slate-100">
          <Card className="w-[425px]">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>
                Accept an Invitation to this event. Fill your infomation below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="john doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="test@user.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="attending"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your rsvp status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="going">Attending</SelectItem>
                            <SelectItem value="not_sure">Probably</SelectItem>
                            <SelectItem value="not_going">
                              Not Attending
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={success}
                    type="submit"
                    className="w-full mt-4 tracking-tight leading-none text-lg"
                  >
                    {isLoading ? (
                      <div className="flex space-x-2 animate-pulse">
                        <div className="h-2 w-2 rounded-full bg-white animate-[bounce_3s_infinite]" />
                        <div className="h-2 w-2 rounded-full bg-white animate-[bounce_1.5s_infinite]" />
                        <div className="h-2 w-2 rounded-full bg-white animate-bounce" />
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </main>
        <div className="basis-1/3 bg-gradient-to-tr from-[#4251C1] via-[#FE5990] to-[#F9F871]" />
      </div>
    </div>
  );
}

export default RsvpForm;
