"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  AtSign,
  Brush,
  FormInput,
  Hand,
  MessageCircle,
} from "lucide-react";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RsvpFormLabelSchema } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Switch } from "./ui/switch";
import { toast } from "sonner";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";

type Input = z.infer<typeof RsvpFormLabelSchema>;
type Props = {
  event_id: string;
  init_rsvp_information:
    | {
        form_id: string;
        form_title: string;
        primary_color: string;
        font: string;
        logo: string | null;
        your_name_disply: boolean;
        your_name_label: string;
        your_name_placeholder: string;
        email_address_display: boolean;
        email_address_label: string;
        email_address_placeholder: string;
        submit_invite_label: string;
        description: string;
      }
    | undefined;
  iFrameRef: any;
};

function EditForm({ event_id, init_rsvp_information, iFrameRef }: Props) {
  const form = useForm<Input>({
    resolver: zodResolver(RsvpFormLabelSchema),
    defaultValues: {
      form_id: event_id,
      form_title: init_rsvp_information?.form_title,
      description: init_rsvp_information?.description,
      your_name_label: init_rsvp_information?.your_name_label,
      your_name_disply: init_rsvp_information?.your_name_disply,
      your_name_placeholder: init_rsvp_information?.your_name_placeholder,
      email_address_label: init_rsvp_information?.email_address_label,
      email_address_display: init_rsvp_information?.email_address_display,
      email_address_placeholder:
        init_rsvp_information?.email_address_placeholder,
      primary_color: init_rsvp_information?.primary_color,
      submit_invite_label: init_rsvp_information?.submit_invite_label,
      font: init_rsvp_information?.font,
    },
  });

  //TRPC Mutation for Request
  const { mutate: submitEventUpdate } = trpc.editRsvpForm.useMutation({
    onSuccess: () => {
      toast.success("Yay! Updated Successfully");
    },
  });

  useEffect(() => {
    // getCurrentValue
    const getCurrentValue = form.watch((value, { name, type }) => {
      iFrameRef.current.contentWindow.postMessage(
        value,
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rsvp/${event_id}?preview=true`
      );
    });
    return () => getCurrentValue.unsubscribe();
  }, [form, iFrameRef, event_id]);

  return (
    <div id="editor" className="p-4">
      <Link
        href={`/events/${event_id}`}
        className="flex items-center gap-2 bg-stone-100 text-sm px-2 py-1 rounded-lg mb-2 w-20 hover:opacity-90 font-medium"
      >
        <ArrowLeft size={14} />
        Events
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((input: Input) => {
            submitEventUpdate({ data: { ...input } });
          })}
          className=""
        >
          <Tabs defaultValue="event_labels" className="">
            <TabsList className="grid w-full grid-cols-2">
              {/*Selecting between event details and form design */}
              <TabsTrigger value="event_labels">
                <FormInput size={14} className="text-green-600 text-2xl mr-2" />
                Customize Form
              </TabsTrigger>
              <TabsTrigger value="form_design">
                <Brush size={14} className="text-sky-400 text-2xl mr-2" />
                Design
              </TabsTrigger>
            </TabsList>
            <TabsContent value="event_labels">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-normal text-lg text-primary/85">
                    <div className="ml-3 flex gap-2 items-center">
                      <Hand
                        size={16}
                        className="text-purple-600 text-2xl mr-2 rotate-45"
                      />
                      Form Header
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="form_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Form Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Title Goes Here"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Invite Message</FormLabel>
                          <FormControl>
                            <Textarea className="h-40" {...field} />
                          </FormControl>
                          <FormDescription>Markdown Supported</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-normal text-lg text-primary/85">
                    <div className="ml-3 flex gap-2 items-center">
                      <MessageCircle
                        size={16}
                        className="text-orange-600 text-2xl mr-2"
                      />
                      Name Field
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="your_name_disply"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Collect Invitee Name</FormLabel>
                            <FormDescription>
                              To Sort Invitees by Name
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="your_name_label"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Collect Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="your_name_placeholder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name Field Placeholder</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="font-normal text-lg text-primary/85">
                    <div className="ml-3 flex gap-2 items-center">
                      <AtSign
                        size={16}
                        className="text-blue-600 text-2xl mr-2"
                      />
                      Email Address Field
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="email_address_display"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Collect Email Address</FormLabel>
                            <FormDescription>
                              Collect Email Address so you can stay in touch
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email_address_label"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Email Field Label</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email_address_placeholder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Field Placeholder</FormLabel>

                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="form_design">
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Name of your Event"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-16">
                <FormField
                  control={form.control}
                  name="primary_color"
                  render={({ field }) => (
                    <FormItem className="mt-2 w-[200px]">
                      <FormLabel>Primary Color</FormLabel>
                      <FormControl>
                        <div className="px-2 py-1 border flex items-center gap-2 rounded-xl h-12">
                          <Input
                            className="border-none shadow-none text-xl uppercase focus-visible:ring-none"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="font"
                  render={({ field }) => (
                    <FormItem className="mt-2 w-[200px]">
                      <FormLabel>Font</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="h-12">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
          </Tabs>
          <Button className="w-full mt-4 text-md font-medium" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default EditForm;
