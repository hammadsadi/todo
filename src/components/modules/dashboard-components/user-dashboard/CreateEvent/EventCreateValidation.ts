import { z } from "zod";

export const eventCreateValidationSchema = z.object({
  title: z.string({ required_error: "Event Title Required!" }),
  image: z.instanceof(File, {
    message: "Event Image is Required and must be a file!",
  }),
  description: z.string({ required_error: "Event Details is Required!" }),
  type: z.string({ required_error: "Event Type is Required!" }),
  fee: z.string({ required_error: "Event Fee is Required!" }),
  startDate: z.string({ required_error: "Event Start Date is Required!" }),
  endDate: z.string({ required_error: "Event End Date is Required!" }),
  isPublic: z.string({ required_error: "Event Status is Required!" }),
  venueOrLink: z.string({ required_error: "Event Venue Or Link is Required!" }),
});
