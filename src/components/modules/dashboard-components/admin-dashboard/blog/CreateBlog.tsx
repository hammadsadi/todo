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
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { TagsInput } from "@/components/modules/Shared/TagsInput";
import { TiptapEditor } from "@/components/modules/Shared/TiptapEditor";
import uploadImage from "@/utils/uploadImageToCloudinary";
import { createProject } from "@/services/Project";
import { createBlogValidationSchema } from "./createBlogValidationSchema";
import { createBlog } from "@/services/BlogServices";

// Infer the form data type from the schema
type CreateProjectFormData = z.infer<typeof createBlogValidationSchema>;

const CreateBlog = () => {
  const router = useRouter();

  const form = useForm<CreateProjectFormData>({
    resolver: zodResolver(createBlogValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<CreateProjectFormData> = async (data) => {
    const toastId = toast.loading("Creating Blog...");
    try {
      const secureUrl = await uploadImage(data.image);
      // Modified Data
      const modifiedData = {
        ...data,
        image: secureUrl,
      };

      const res = await createBlog(modifiedData);
      if (res.success) {
        toast.success("Blog Created successfully", { id: toastId });
        router.push("/dashboard/admin/blogs");
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="border p-7 md:p-10 rounded">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Blog Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Title</FormLabel>
                <FormControl>
                  <Input placeholder="This Is Website" {...field} />
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
              </FormItem>
            )}
          />

          {/* Blog Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Description</FormLabel>
                <FormControl>
                  <TiptapEditor
                    content={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit Project"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateBlog;
