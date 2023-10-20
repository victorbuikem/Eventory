"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
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
import ConfettiExplosion from "react-confetti-explosion";
import { useEffect, useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
/*Types */
type Props = {
  slug: string;
  title: string | undefined;
  description: string | undefined;
  your_name_label: string | undefined;
  buttonLabel: string | undefined;
  email_address_label: string | undefined;
  primaryColor: string | undefined;
  your_name_display: boolean | undefined;
  your_name_placeholder: string | undefined;
  email_address_placeholder: string | undefined;
  email_address_display: boolean | undefined;
};

function RsvpForm({
  slug,
  title,
  description,
  your_name_label,
  buttonLabel,
  email_address_label,
  primaryColor,
  your_name_display,
  your_name_placeholder,
  email_address_placeholder,
  email_address_display,
}: Props) {
  const searchparam = useSearchParams();
  const preview = searchparam.get("preview");
  const [previewData, setPreviewData] = useState<any>({
    form_title: title,
    description,
    your_name_label,
    buttonLabel,
    email_address_label,
    primary_color: primaryColor,
    your_name_disply: your_name_display,
    your_name_placeholder,
    email_address_placeholder,
    email_address_display,
  });
  const [success, setSucess] = useState(false);
  const form = useForm();

  const { mutate: acceptEvent, isLoading } = trpc.acceptRsvpForm.useMutation({
    onSuccess: () => {
      setSucess(true);
    },
    onError: () => {
      toast.error("Something went Wrong");
    },
  });
  useEffect(() => {
    // Create a function to handle the incoming messages
    const handleMessage = (event: any) => {
      console.log(event);
      // Verify the origin of the message to ensure it's from a trusted source
      if (event.origin !== process.env.NEXT_PUBLIC_SERVER_URL) {
        return;
      }

      const data = event.data;
      // Do something with the data from the parent window
      setPreviewData((prev: any) => data);
    };

    // Add an event listener to the window to handle messages
    window.addEventListener("message", handleMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="min-h-full">
      <div className="flex flex-col-reverse md:flex-row md:flex-1 ">
        {success && (
          <ConfettiExplosion
            duration={3000}
            particleCount={400}
            width={2000}
            force={0.9}
          />
        )}
        <main className="flex flex-col items-center justify-center flex-1 flex-shrink-0 px-1 md:px-5 pt-16 pb-8 border-r shadow-lg h-screen bg-slate-100">
          <Card className="w-full md:w-[425px] relative">
            {preview ? (
              <div className="absolute w-full md:w-[425px] h-full bg-black/0" />
            ) : null}
            <CardHeader>
              <CardTitle>{preview ? previewData.form_title : title}</CardTitle>
              <CardDescription>
                {preview ? previewData.description : description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((input) => {
                    setSucess(false);
                    acceptEvent({ data: { ...input, slug } });
                  })}
                >
                  {preview && previewData.your_name_disply && (
                    <FormField
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{previewData.your_name_label}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={previewData.your_name_placeholder}
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {!preview && your_name_display && (
                    <FormField
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{your_name_label}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={your_name_placeholder}
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {!preview && email_address_display && (
                    <FormField
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{email_address_label}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={email_address_placeholder}
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {preview && previewData.email_address_display && (
                    <FormField
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {previewData.email_address_label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={
                                previewData.email_address_placeholder
                              }
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* {custom_input.map((value) => (
                   <FormField
                     key={value.id}
                     name={value.id}
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>{value.label}</FormLabel>
                         <FormControl>
                           <Input
                             type={value.type}
                            placeholder=",wmsnczk"
                             required={value.required}
                             {...field}
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                     ))} */}

                  <FormField
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
                    type="submit"
                    className={`w-full mt-4 tracking-tight leading-none text-lg custom-color hover:opacity-80`}
                    style={
                      {
                        "--bg_form": preview
                          ? previewData.primary_color
                          : primaryColor,
                      } as React.CSSProperties
                    }
                  >
                    {isLoading ? (
                      <div className="flex space-x-2 animate-pulse">
                        <div className="h-2 w-2 rounded-full bg-white animate-[bounce_3s_infinite]" />
                        <div className="h-2 w-2 rounded-full bg-white animate-[bounce_1.5s_infinite]" />
                        <div className="h-2 w-2 rounded-full bg-white animate-bounce" />
                      </div>
                    ) : (
                      <p>{buttonLabel}</p>
                    )}
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
          style={
            {
              "--bg_form": preview ? previewData.primary_color : primaryColor,
            } as React.CSSProperties
          }
          className="h-[138px] md:h-screen md:basis-[40%] custom-color"
        />
      </div>
    </div>
  );
}

export default RsvpForm;

/*
 */
