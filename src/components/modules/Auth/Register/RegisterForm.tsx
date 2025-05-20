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
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterValidationSchema } from "./RegisterValidationSchema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";
import { userRegister } from "@/services/AuthServices";

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(RegisterValidationSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;

  // Register Form Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const creatingUser = toast.loading("User Creating...");
    try {
      const res = await userRegister(data);
      if (res?.success) {
        toast.success(res?.message, { id: creatingUser });
        router.push("/");
      } else {
        toast.error(res?.message, { id: creatingUser });
      }
    } catch {
      toast.error("Something went Wrong!", { id: creatingUser });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white dark:bg-black border p-7 md:p-10 rounded">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
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
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} value={field.value || ""} />
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
              "Register"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
