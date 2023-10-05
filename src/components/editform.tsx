"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtSign, Brush, FormInput, Hand, MessageCircle } from "lucide-react";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Switch } from "./ui/switch";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

type Input = z.infer<typeof RsvpFormLabelSchema>;
type Props = {
  event_id: string;
  set_rsvp_information: Dispatch<SetStateAction<any>>;
  init_rsvp_information: any;
};

function EditForm({
  event_id,
  set_rsvp_information,
  init_rsvp_information: {
    form_title,
    primary_color,
    font,
    your_name_label,
    your_name_placeholder,
    email_address_label,
    email_address_placeholder,
    submit_invite_label,
    description,
  },
}: Props) {
  const { toast } = useToast();
  const form = useForm<Input>({
    resolver: zodResolver(RsvpFormLabelSchema),
    defaultValues: {
      form_id: event_id,
      form_title,
      description,
      your_name_label,
      your_name_disply: true,
      your_name_placeholder,
      email_address_label,
      email_address_display: true,
      email_address_placeholder,
      primary_color,
      submit_invite_label,
      font,
    },
  });

  //React Mutation for Request
  const { mutate: submitEventUpdate, isLoading } = useMutation({
    mutationFn: async (input: Input) => {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}api/create`,
        { ...input }
      );
      return res.data;
    },
  });

  function onSubmit(input: Input) {
    submitEventUpdate(
      { ...input },
      {
        onSuccess: () => {
          toast({
            title: "Yay! Updated Successfully 🎉",
          });
        },
      }
    );
  }

  useEffect(() => {
    // getCurrentValue
    const getCurrentValue = form.watch((value, { name, type }) =>
      set_rsvp_information(value)
    );
    return () => getCurrentValue.unsubscribe();
  }, []);

  return (
    <div id="editor" className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <Tabs defaultValue="event_labels" className="w-[500px]">
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
                              placeholder="Your Title Goes  Here"
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
                          <Popover>
                            <PopoverTrigger>
                              <div
                                style={{ backgroundColor: field.value }}
                                className="w-6 h-6 rounded-full"
                              />
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Input type="color" {...field} />
                            </PopoverContent>
                          </Popover>
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
