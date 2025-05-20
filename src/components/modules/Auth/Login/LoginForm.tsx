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
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "./LoginValidationSchema";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";
import { userLogin } from "@/services/AuthServices";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;

  // Register Form Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loginUser = toast.loading("User Login...");
    try {
      const res = await userLogin(data);
      // setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message, { id: loginUser });
        const redirectPath = searchParams.get("redirectPath") || "/";
        router.push(redirectPath);
      } else {
        toast.error(res?.message, { id: loginUser });
      }
    } catch {
      toast.error("Something went Wrong!", { id: loginUser });
    }
  };

  return (
    <div className="max-w-md mx-auto w-full bg-white dark:bg-black border p-7 md:p-10 rounded">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Username</FormLabel>
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
            {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
