import { z } from "zod";

const requiredString = z.string().min(1, "required").trim();

const signUpSchema = z.object({
  email: requiredString.email("Invalid email provided"),
  username: requiredString,
  password: requiredString.min(
    8,
    "Password is too short, must be 8 characters",
  ),
});

const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;

export { signUpSchema, loginSchema };
