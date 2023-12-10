import { ZodError, z } from "zod";

// Write zod method to validate email
export const emailValidator = z
  .string()
  .refine((data) => !!data, { message: "Email is required" })
  .refine((data) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data), {
    message: "Invalid email format",
  });

export const phoneValidator = z
  .string()
  .refine((data) => !!data, { message: "Phone number is required" })
  .refine((data) => /^\+\d{1,3}-\d{1,14}$/.test(data), {
    message: "Invalid phone number format",
  });

export const personalNameValidator = z
  .string()
  .refine((data) => !!data, { message: "Name is required" })
  .refine((data) => data.split(" ").length >= 2, {
    message: "Name must have at least 2 words",
  })
  .refine((data) => data.length >= 3, {
    message: "Name must be at least 3 characters long",
  });

export const urlValidator = z
  .string()
  .refine((data) => !!data, { message: "URL is required" })
  .refine(
    (data) => {
      try {
        new URL(data);
        return true;
      } catch (error) {
        return false;
      }
    },
    { message: "Invalid Image URL" }
  );

export const Validate =
  (objectValidator: z.ZodType<any, any>) =>
  (data: any): string | undefined => {
    try {
      objectValidator.parse(data);
      return undefined;
    } catch (error) {
      if (error instanceof ZodError) {
        return error.errors[0].message;
      }
      throw error;
    }
  };
