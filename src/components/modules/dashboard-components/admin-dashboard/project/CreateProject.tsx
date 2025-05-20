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
import { createProjectValidationSchema } from "./CreateProjectValidationSchema";
import { TagsInput } from "@/components/modules/Shared/TagsInput";
import { TiptapEditor } from "@/components/modules/Shared/TiptapEditor";
import uploadImage from "@/utils/uploadImageToCloudinary";
import { createProject } from "@/services/Project";

// Infer the form data type from the schema
type CreateProjectFormData = z.infer<typeof createProjectValidationSchema>;

const CreateProject = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      technologies: [],
      features: [],
      image: undefined,
      clientRepository: "",
      serverRepository: "",
      liveLink: "",
      installation: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<CreateProjectFormData> = async (data) => {
    const toastId = toast.loading("Submitting project...");
    try {
      const files = data.image;
      const uploadedImageUrls: string[] = [];
      for (const file of Array.from(files)) {
        const secureUrl = await uploadImage(file);
        if (secureUrl) {
          uploadedImageUrls.push(secureUrl);
        }
      }

      const modifiedData = {
        ...data,
        image: uploadedImageUrls,
      };

      console.log("Project Data:", data);
      const res = await createProject(modifiedData);
      if (res.success) {
        toast.success("Project submitted successfully", { id: toastId });
        router.push("/dashboard/admin/projects");
      } else {
        toast.error(res.message, { id: toastId });
      }

      //   const redirectPath = searchParams.get("redirectPath") || "/";
      //   router.push(redirectPath);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="border p-7 md:p-10 rounded">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Project Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="E-Commerce Website" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Describe your project..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Technologies */}
          <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies</FormLabel>
                <FormControl>
                  <TagsInput
                    placeholder="React, Tailwind CSS..."
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Features */}
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Features</FormLabel>
                <FormControl>
                  <TagsInput
                    placeholder="Dark Mode, SEO friendly..."
                    value={field.value}
                    onChange={field.onChange}
                  />
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
                    multiple
                    {...field}
                    onChange={(e) => onChange(e.target.files)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Repositories */}
          <FormField
            control={form.control}
            name="clientRepository"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Repository</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://github.com/username/client"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serverRepository"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Server Repository</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://github.com/username/server"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Live Link */}
          <FormField
            control={form.control}
            name="liveLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Live Website Link</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Installation */}
          <FormField
            control={form.control}
            name="installation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Installation Instructions</FormLabel>
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

export default CreateProject;
