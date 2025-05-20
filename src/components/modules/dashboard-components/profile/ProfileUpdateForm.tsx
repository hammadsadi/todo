"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
// import { IUser } from "@/types/user.types";
// import { updateUserProfile } from "@/services/AuthServices";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Username can only contain lowercase letters, numbers, and hyphens.",
    }),
});

export default function ProfileUpdateForm({ user }: { user: IUser }) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const updating = toast.loading("Updating profile...");

    // try {
    //   // Replace with your actual update API call
    //   const response = await updateUserProfile(user.id, values);

    //   if (response.success) {
    //     toast.success("Profile updated successfully", { id: updating });
    //   } else {
    //     toast.error(response.message || "Failed to update profile", {
    //       id: updating,
    //     });
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong", { id: updating });
    //   console.error(error);
    // } finally {
    //   setIsLoading(false);
    // }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button className="text-white" type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
