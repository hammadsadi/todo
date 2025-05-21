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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { userLogin } from "@/services/AuthServices";
import { experienceValidationSchema } from "./ExperienceValidationSchema";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { createExperience } from "@/services/Experience";

const AddNewExperience = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm({
    resolver: zodResolver(experienceValidationSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;

  // Register Form Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const creatingExperience = toast.loading("Creating Experience...");
    try {
      const res = await createExperience(data);
      if (res?.success) {
        toast.success(res?.message, { id: creatingExperience });
        form.reset();
      } else {
        toast.error(res?.message, { id: creatingExperience });
      }
    } catch {
      toast.error("Something went Wrong!", { id: creatingExperience });
    }
  };

  return (
    <div className="max-w-md mx-auto w-full bg-white dark:bg-black border p-7 md:p-10 rounded">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
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
                  <FormLabel>Description</FormLabel>
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
              "Create"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddNewExperience;
