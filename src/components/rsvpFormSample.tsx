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
/*Types */
type Props = {};

type Input = z.infer<typeof RsvpAcceptSchema>;

function RsvpFormSample({
  form_title,
  primary_color,
  font,
  logo,
  your_name_disply,
  your_name_label,
  your_name_placeholder,
  email_address_display,
  email_address_label,
  email_address_placeholder,
  submit_invite_label,
  description,
}: any) {
  const form = useForm<Input>();

  return (
    <div className="h-full rounded-lg">
      <div className="flex flex-1 h-full rounded-lg">
        <main className="flex flex-col items-center justify-center flex-1 flex-shrink-0 px-5 pt-16 pb-8 border-r shadow-lg h-full bg-slate-100">
          <Card className="w-[425px] relative scale-75">
            <div className="absolute w-[425px] h-full bg-black/0" />

            <CardHeader>
              <CardTitle>{form_title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form>
                  {your_name_disply && (
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{your_name_label}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={your_name_placeholder}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {email_address_display && (
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{email_address_label}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={email_address_placeholder}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="attending"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Attending Status</FormLabel>
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
                    style={{ backgroundColor: primary_color }}
                    type="submit"
                    className="w-full mt-4 tracking-tight leading-none text-lg cursor-default"
                  >
                    {submit_invite_label}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <a
              href="https://eventory.vercel.app"
              target="blank"
              className="absolute -bottom-3 right-4 bg-white ring-1 ring-purple-500 shadow-lg shadow-fuchsia-500 px-2 rounded-2xl h-5 text-primary font-semibold text-sm hover:shadow-xl hover:shadow-fuchsia-600"
            >
              Eventory
            </a>
          </Card>
        </main>
        <div
          style={{ backgroundColor: primary_color }}
          className="basis-[40%]"
        />
      </div>
    </div>
  );
}

export default RsvpFormSample;
