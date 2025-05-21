"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { contactValidationSchema } from "./contactValidationSchema";
import { toast } from "sonner";
import { createMessages } from "@/services/Message";
const ContactSection = () => {
  const form = useForm({
    resolver: zodResolver(contactValidationSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;

  // Handle Submit Message Add Form
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const messageToastId = toast.loading("Sending Message...");
    try {
      const res = await createMessages(data);
      if (res?.success) {
        toast.success(res?.message, { id: messageToastId });
        form.reset();
      } else {
        toast.error(res?.error, { id: messageToastId });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: messageToastId });
    }
  };
  return (
    <section
      id="contact"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-xl shadow-lg border border-muted"
          >
            <h3 className="text-2xl font-semibold mb-6">Send me a message</h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-2">
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
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
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
                        <FormLabel>Message</FormLabel>
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
                    "Send"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-card p-8 rounded-xl shadow-lg border border-muted h-full">
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a
                      href="mailto:hammad.sadi@yahoo.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      hammad.sadi@yahoo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <a
                      href="tel:  +8801760170010"
                      className="text-muted-foreground hover:text-blue-500 transition-colors"
                    >
                      +8801760170010
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-purple-500/10 text-purple-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-muted-foreground">Sylhet, Bangladesh</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="font-medium mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  <Link
                    href="#"
                    className="p-3 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {/* Replace with actual social icons */}
                    <span className="w-5 h-5">
                      <Github />
                    </span>
                  </Link>
                  <Link
                    href="#"
                    className="p-3 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {/* Replace with actual social icons */}
                    <span className="w-5 h-5">
                      <Linkedin />
                    </span>
                  </Link>
                  <Link
                    href="#"
                    className="p-3 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {/* Replace with actual social icons */}
                    <span className="w-5 h-5">
                      <Twitter />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
