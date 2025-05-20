"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import uploadImage from "@/utils/imageUploadToCloudinary";
import { updateLoggedInUserSingleEvent } from "@/services/Event";
import { TEvent } from "@/types/event.type";

const UpdateEvent = ({ event }: { event: TEvent }) => {
  const { setIsLoading } = useUser();
  //  Form
  const form = useForm({
    defaultValues: {
      title: event.title || "",
      description: event.description || "",
      type: event.type || "",
      isPublic: event.isPublic ? "true" : "false",
      fee: event.fee || 0,
      image: event.image || "",
      startDate: event.startDate || "",
      endDate: event.endDate || "",
      venueOrLink: event.venueOrLink || "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  //  Form Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //  Loading State
    const updateEvent = toast.loading("Updating Event...");
    let updatedImage = event.image;
    if (data?.image?.name) {
      // Upload Image to Cloudinary
      updatedImage = await uploadImage(data.image);
    }

    //  Upload Image to Cloudinary
    const imageUrl = await uploadImage(data.image);
    try {
      // Modify the data before sending it to the server
      const modifiedData = {
        ...data,
        isPublic: data.isPublic === "true" ? true : false,
        fee: Number(data.fee),
        image: updatedImage,
      };
      //  Create Event
      const res = await updateLoggedInUserSingleEvent(event?.id, modifiedData);
      setIsLoading(true);
      // Success
      if (res?.success) {
        form.reset();
        toast.success(res?.message, { id: updateEvent });
      } else {
        toast.error("Something went Wrong!", { id: updateEvent });
      }
    } catch {
      toast.error("Something went Wrong!", { id: updateEvent });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Event Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ONLINE">Online</SelectItem>
                      <SelectItem value="OFFLINE">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Fee</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Event Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Public</SelectItem>
                      <SelectItem value="OFFLINE">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Start Date & Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(new Date(field.value), "PPP p")
                          : "Pick date & time"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-4 space-y-2"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(d) => {
                          if (!d) return;
                          const current = field.value
                            ? new Date(field.value)
                            : new Date();
                          d.setHours(current.getHours());
                          d.setMinutes(current.getMinutes());
                          field.onChange(d.toISOString());
                        }}
                        initialFocus
                      />
                      <Input
                        type="time"
                        onChange={(e) => {
                          const [hours, minutes] = e.target.value
                            .split(":")
                            .map(Number);
                          const current = field.value
                            ? new Date(field.value)
                            : new Date();
                          current.setHours(hours);
                          current.setMinutes(minutes);
                          field.onChange(current.toISOString());
                        }}
                        className="w-full"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event End Date & Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(new Date(field.value), "PPP p")
                          : "Pick date & time"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-4 space-y-2"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(d) => {
                          if (!d) return;
                          const current = field.value
                            ? new Date(field.value)
                            : new Date();
                          d.setHours(current.getHours());
                          d.setMinutes(current.getMinutes());
                          field.onChange(d.toISOString());
                        }}
                        initialFocus
                        disabled={(date) => {
                          const start = form.watch("startDate");
                          return start ? date <= new Date(start) : false;
                        }}
                      />
                      <Input
                        type="time"
                        onChange={(e) => {
                          const [hours, minutes] = e.target.value
                            .split(":")
                            .map(Number);
                          const current = field.value
                            ? new Date(field.value)
                            : new Date();
                          current.setHours(hours);
                          current.setMinutes(minutes);
                          field.onChange(current.toISOString());
                        }}
                        className="w-full"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="venueOrLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue Or Link</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
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
                  <FormLabel>Event Details</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-2 dark:text-white cursor-pointer"
          >
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateEvent;
