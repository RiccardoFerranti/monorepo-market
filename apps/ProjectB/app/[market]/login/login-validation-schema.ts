import { z } from "zod";

const MSG = {
  missingFields: "missingFields",
  tooShort: "tooShort",
} as const;

export const LoginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: MSG.missingFields })
    .min(3, { message: MSG.tooShort }),
  password: z
    .string()
    .trim()
    .min(1, { message: MSG.missingFields })
    .min(3, { message: MSG.tooShort }),
});
